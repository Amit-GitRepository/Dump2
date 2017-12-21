import api from '../api/api.saga';
import billUsage from '../../reducers/billUsage.reducer';
import ebillSaga, {applyForEBill, delayAction, fetchBillingPreference, productListSelector} from '../ebill.saga';
import sagaHelper from 'redux-saga-testing';
import {APPLY_FOR_EBILL, GET_BILL_PREFERENCE, hideSpinner, setBillingPreference, showSpinner} from '../../actions/index.actions';
import {billPreference, registerEbill} from '../api/apiHelper';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {NavigationActions} from 'react-navigation';

const productList = {
  'tmhPostpaid': [{
    'productId': '0968730313',
    'subscriberId': '193591',
    'accountId': '10101029',
    'balance': '0.0',
    'subscriptionType': 'POSTPAID',
    'statusCode': 'ACTIVE',
    'productType': 'TrueMoveH'
  }],
  'tvs': [],
  'tol': [],
  'conv': []
};

describe('ebillSaga: Testing the root Saga', () => {
  const it = sagaHelper(ebillSaga());
  it('Should take the every GET_BILL_PREFERENCE actions and call fetchBillingPreference saga', (result) => {
    expect(result).toEqual(takeEvery(GET_BILL_PREFERENCE, fetchBillingPreference));
  });
  it('Should take the every APPLY_FOR_EBILL actions and call fetchBillingPreference saga', (result) => {
    expect(result).toEqual(takeEvery(APPLY_FOR_EBILL, applyForEBill));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('ebillSaga: fetchBillingPreference saga', () => {
  billUsage({productList: productList}, {});
  const it = sagaHelper(fetchBillingPreference({payload: {accountIds: ['10100949', '10101029']}}));
  it('Should call api billPreference', (result) => {
    expect(result).toEqual(call(api, billPreference({accountIds: ['10100949', '10101029']})));
    return {
      body: [{
        'accountId': '10101029',
        'billingFormat': 'SMS',
        'billingValue': ''
      }]
    };
  });

  it('Should select product list', (result) => {
    expect(result).toEqual(select(productListSelector));
    return productList;
  });

  it('Should dispatch action to setBillPreference', (result) => {
    expect(result).toEqual(put(setBillingPreference({
      'SMS': [{
        'accountId': '10101029',
        'billingFormat': 'SMS',
        'billingValue': '0968730313',
        'productId': '0968730313',
        'subscriberId': '193591',
        'balance': '0.0',
        'subscriptionType': 'POSTPAID',
        'statusCode': 'ACTIVE',
        'productType': 'TrueMoveH',
        'accountType': 'tmhPostpaid'
      }]
    })));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('ebillSaga: applyForEBill saga', () => {
  const it = sagaHelper(applyForEBill({payload: [{'accountId': '10100949', 'accountType': 'tmhPostpaid', 'billingFormat': 'SMS', 'emailToRegister': '', 'msisdnToRegister': '0968730312'}]}));
  it('Should select product list', (result) => {
    expect(result).toEqual(select(productListSelector));
    return productList;
  });
  it('Should call api registerEbill', (result) => {
    expect(result).toEqual(call(api, registerEbill([{'accountId': '10100949', 'accountType': 'tmhPostpaid', 'billingFormat': 'SMS', 'emailToRegister': '', 'msisdnToRegister': '0968730312'}])));
    return {
      body: 'Order submitted successfully in OMX'
    };
  });
  it('Should show spinner', (result) => {
    expect(result).toEqual(put(showSpinner()));
  });
  it('Should wait for 2 sec', (result) => {
    expect(result).toEqual(delayAction);
  });
  it('Should navigate to bill methods route', (result) => {
    const resetAction = NavigationActions.reset({index: 0, actions: [NavigationActions.navigate({routeName: 'BillingMethods'})]});
    expect(result).toEqual(put(resetAction));
  });
  it('Should hide spinner', (result) => {
    expect(result).toEqual(put(hideSpinner()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
