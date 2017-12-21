import api from './api/api.saga';
import {billUsageProductBillDetail, billUsageProductDetail, billUsageProductList, preLoginProduct} from './api/apiHelper';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {find, findKey, isEmpty, result} from 'lodash';
import {getSelector} from '../../utils/common.util';
import {PRODUCT_STATUS, PRODUCT_TABS} from '../../config/billUsage.config';
import * as actions from '../actions/index.actions';

export const idCardSelector = getSelector('user.profile.idcard');
export const idCardReferenceSelector = getSelector('user.profile.idcard_reference');
export const productListSelector = getSelector('billUsage.productList');
export const productDetailSelector = getSelector('billUsage.productDetail');
export const productBillDetailSelector = getSelector('billUsage.billDetail');

export function* expandFirstProduct (products) {
  const productKey = findKey(products, (product) => !isEmpty(product)); // Get the key of the first product which has data
  const productWithData = products[productKey][0];
  const {subscriberId, bundle = '', productId, productType, subscriptionType, accountId, statusCode} = productWithData;
  const selectedTabNumber = (statusCode === PRODUCT_STATUS.CANCEL) ? PRODUCT_TABS.BILL_SUMMARY : PRODUCT_TABS.CURRENT_USAGE;
  yield call(toggleProductCollapseStatus, {payload: {subscriberId, productType: productKey, convBundleName: bundle, productId, productTypePayload: productType, subscriptionType, accountId, selectedTabNumber}});
}

export function* fetchProductList () {
  try {
    const idCardReference = yield select(idCardReferenceSelector);
    const idCard = yield select(idCardSelector);
    // TODO: Added the temporary idcard and msisdn login for product api
    let productList;
    if (idCardReference && idCardReference !== '') {
      productList = yield call(api, billUsageProductList({idCard: idCardReference}));
    } else {
      productList = yield call(api, billUsageProductList({idCard}));
    }
    yield put(actions.setBillUsageProductList(productList.body));
    yield call(expandFirstProduct, productList.body);
  } catch (err) {
    // console.log(err); TODO Error handling
  }
}

export function* fetchProduct () {
  try {
    const msisdn = yield select(getSelector('preLoginPay.msisdn'));
    const product = yield call(api, preLoginProduct(msisdn));
    yield put(actions.setBillUsageProductList(product.body));
  } catch (err) {
    // console.log(err); TODO Error handling
  }
}

export function* fetchProductDetail ({payload}) {
  const {subscriberId, productType, productTypePayload, subscriptionType, productId, convBundleName} = payload;
  const productKey = convBundleName ? 'conv' : productType;
  const productDetail = yield call(api, billUsageProductDetail(productId, productTypePayload, subscriberId, subscriptionType));
  yield put(actions.setBillUsageProductDetail({'productType': productKey, subscriberId, data: productDetail.body}));
}

export function* fetchProductBillDetail ({payload}) {
  try {
    const {accountId, productType, bundle} = payload;
    const isConvergence = productType === 'conv';
    const billDetail = yield call(api, billUsageProductBillDetail(accountId, isConvergence));
    yield put(actions.setBillUsageProductBillDetail({productType, data: billDetail.body, bundle}));
  } catch (err) {
    // console.log(err); TODO Error handling
  }
}

export function* toggleProductCollapseStatus ({payload}) {
  const {subscriberId, productType, convBundleName, productId, productTypePayload, subscriptionType, accountId, selectedTabNumber} = payload;
  const productKey = convBundleName ? 'conv' : productType;
  try {
    const productList = yield select(productListSelector);
    let productGroupList = result(productList, `${productKey}`, []);
    if (convBundleName) {
      productGroupList = find(productGroupList, {bundle: convBundleName});
      productGroupList = productGroupList.products;
    }
    const selectedProduct = find(productGroupList, {subscriberId}) || {};
    if (selectedProduct.isCollapsed) {
      if (selectedTabNumber === PRODUCT_TABS.BILL_SUMMARY) {
        const allBillDetail = yield select(productBillDetailSelector);
        const selectedBillDetail = result(allBillDetail, `${productKey}.${accountId}`, null);
        if (!selectedBillDetail) {
          yield call(fetchProductBillDetail, {payload: {accountId, convBundleName, productType: productKey}});
        }
      } if (selectedTabNumber === PRODUCT_TABS.CURRENT_USAGE) {
        const allProductDetail = yield select(productDetailSelector);
        const selectedProductDetail = result(allProductDetail, `${productKey}.${subscriberId}`, null);
        if (!selectedProductDetail) {
          yield call(fetchProductDetail, {payload: {subscriberId, productType, productTypePayload, subscriptionType, productId, convBundleName}});
        }
      }
    }
    yield put(actions.setBillUsageProductCollapseStatus({productType, subscriberId, isCollapsed: !selectedProduct.isCollapsed, convBundleName}));
  } catch (err) {
    yield put(actions.setBillUsageProductCollapseStatus({productType, subscriberId, isCollapsed: true, convBundleName}));
    // console.log(err); TODO Error handling
  }
}

// TODO Inprogress code
// export function* fetchAndNavigateToBillUsage () {
//   try {
//     yield fetchProductList();
//     yield put(NavigationActions.navigate({routeName: 'Payment'}));
//   } catch (e) {
//     console.log(e);
//   }
// }

export default function* billUsageSaga () {
  yield takeEvery(actions.GET_BILL_USAGE_PRODUCT_LIST, fetchProductList);
  yield takeEvery(actions.GET_BILL_USAGE_PRODUCT, fetchProduct);
  yield takeEvery(actions.GET_BILL_USAGE_PRODUCT_BILL_DETAIL, fetchProductBillDetail);
  yield takeEvery(actions.TOGGLE_BILL_USAGE_PRODUCT_COLLAPSE_STATUS, toggleProductCollapseStatus);
  yield takeEvery(actions.GET_BILL_USAGE_PRODUCT_DETAIL, fetchProductDetail);
  // yield takeEvery(actions.FETCH_BILL_USAGE_AND_NAVIGATE, fetchAndNavigateToBillUsage);
}
