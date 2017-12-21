import api from './api/api.saga';
import {assign, camelCase, each, every, find, forEach, groupBy, map, reject, result} from 'lodash';
import {billPreference, registerEbill} from './api/apiHelper';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {getSelector} from '../../utils/common.util';
import {NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/reactNative.util';
import {translate} from '../../language/i18n/helper';
import * as actions from '../actions/index.actions';

const formatProductList = (productList) => {
  const formattedRes = {};
  forEach(productList, (array, key) => {
    if (key === 'tmhPrepaid') {
      return;
    }

    if (key === 'conv') {
      // so for convergence account - All the accounts for which
      // convergenceCode is same && isBillConsolidated
      // then use any one of the accountIds
      // otherwise use all the accountIds individually
      map(array, (val) => {
        const productList = result(val, 'products', []);
        if (every(productList, (item) => item.isBillConsolidated)) {
          const obj = assign({}, productList[0]);
          obj.accountType = key;
          formattedRes[productList[0].accountId] = obj;
        } else {
          map(productList, (val) => {
            const obj = assign({}, val);
            obj.accountType = key;
            formattedRes[val.accountId] = obj;
          });
        }
      });
    } else {
      map(array, (val) => {
        const obj = assign({}, val);
        obj.accountType = key;
        formattedRes[val.accountId] = obj;
      });
    }
  });

  return formattedRes;
};

const mergeProductListAndBillPreference = (productList, billPreference) => {
  const mergedBillPreference = map(billPreference, (billPreferenceObj) => {
    const productListData = productList[billPreferenceObj.accountId];
    // adding a check for TrueMoveHPostpaid number as
    // for the ebill format - SMS
    // the billing value will always be equal to `productId` and not populated from the backend
    if (productListData.productType === 'TrueMoveH' && billPreferenceObj.billingFormat === 'SMS') {
      billPreferenceObj.billingValue = productListData.productId;
    }
    return assign({}, billPreferenceObj, productListData);
  });
  return  groupBy(mergedBillPreference, 'billingFormat');
};

const mapAccountType = (type) => {
  const camelCasedType = camelCase(type);
  let accountType = '';
  switch (camelCasedType) {
  case 'trueMoveH': {
    accountType = 'tmhPostpaid';
    break;
  }
  case 'trueVision': {
    accountType = 'tvs';
    break;
  }
  case 'trueOnline': {
    accountType = 'tol';
    break;
  }
  default:
      // do nothing
  }

  return accountType;
};

const addConvergenceAccountIDsToRegisterEbillPayload = (payload, convList) => {
  const formattedPayload = payload;
  map(formattedPayload, (item) => {
    if (item.accountType === 'conv') {
      let bundleID = null;
      let accountInPayload = {};
      // search for bundle id for which the accountId belong to and has isBillConsolidated is true
      map(convList, (convItem) => {
        accountInPayload = find(convItem.products, (convInnerItem) => {
          if ((convInnerItem.accountId === item.accountId) && (convInnerItem.isBillConsolidated)) {
            item.accountType = mapAccountType(convInnerItem.productType);
            return convInnerItem.convergenceCode;
          }
        });
        bundleID = accountInPayload.convergenceCode;
      });

      // get all the accountIds for the corresponding bundle id
      const accountsInBundleID = find(convList, (convItem) => convItem.bundle === bundleID);

      // remove the accountId already existing in the payload
      const accountsToAdd = reject(accountsInBundleID.products, accountInPayload);

      // extract only accountIds from the product list
      const accountsToAddIDs = map(accountsToAdd, (account) => ({accountId: account.accountId, accountType: account.productType}));

      // form the payload for the accountIds - which needs to be added
      const payloadToAdd = map(accountsToAddIDs, (val) => ({...item, ...{accountId: val.accountId, accountType: mapAccountType(val.accountType)}}));

      // push each object to formatted payload
      each(payloadToAdd, (item) => formattedPayload.push(item));
    }
  });

  return formattedPayload;
};

export const productListSelector = getSelector('billUsage.productList');

export function* fetchBillingPreference ({payload}) {
  try {
    const billPreferenceRes = yield call(api, billPreference(payload));
    const productList = yield select(productListSelector);
    const mergedPayload = mergeProductListAndBillPreference(formatProductList(productList), billPreferenceRes.body);
    yield put(actions.setBillingPreference(mergedPayload));
  } catch (err) {
    // console.log(err);
  }
}

export const delayAction = delay(2000);

export function* applyForEBill ({payload}) {
  try {
    const productList = yield select(productListSelector);
    const convList = result(productList, 'conv', []);
    const formattedPayload = addConvergenceAccountIDsToRegisterEbillPayload(payload, convList);

    yield call(api, registerEbill(formattedPayload));
    yield put(actions.showSpinner());
    yield delayAction; // Because backend takes approx 2 sec to make changes after a response is received
    yield put(NavigationActions.reset({index: 0, actions: [NavigationActions.navigate({routeName: 'BillingMethods'})]}));
    yield put(actions.hideSpinner());
    Toast.show(translate('BILLING_METHODS__APPLY_SUCCESS'), Toast.LONG);
  } catch (err) {
    yield put(actions.showPopup({
      title: translate('BILLING_METHODS__ADD_BAD_REQUEST'),
      body: translate('BILLING_METHODS__ADD__BAD_REQUEST_BODY'),
      buttons: [
        {
          title: translate('BUTTON__OK'),
          actionType: 'Navigation/NAVIGATE',
          nextAction: {routeName: 'BillingMethods'}
        }
      ]
    }));
  }
}

export default function* ebillSaga () {
  yield takeEvery(actions.GET_BILL_PREFERENCE, fetchBillingPreference);
  yield takeEvery(actions.APPLY_FOR_EBILL, applyForEBill);
}
