import api from '../api/api.saga';
import billUsageSaga, {expandFirstProduct, fetchProduct, fetchProductBillDetail, fetchProductDetail, fetchProductList, idCardReferenceSelector, idCardSelector, toggleProductCollapseStatus} from '../billUsage.saga';
import sagaHelper from 'redux-saga-testing';
import {billUsageProductDetail, billUsageProductList} from '../api/apiHelper';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {GET_BILL_USAGE_PRODUCT, GET_BILL_USAGE_PRODUCT_BILL_DETAIL, GET_BILL_USAGE_PRODUCT_DETAIL,
  GET_BILL_USAGE_PRODUCT_LIST, setBillUsageProductDetail, setBillUsageProductList, TOGGLE_BILL_USAGE_PRODUCT_COLLAPSE_STATUS
} from '../../actions/index.actions';

describe('billUsageSaga: Testing the root Saga', () => {
  const it = sagaHelper(billUsageSaga());
  it('Should take the every get Bill usage product action and call fetchProductList saga', (result) => {
    expect(result).toEqual(takeEvery(GET_BILL_USAGE_PRODUCT_LIST, fetchProductList));
  });
  it('Should take the every GET_BILL_USAGE_PRODUCT action and call fetchProduct saga', (result) => {
    expect(result).toEqual(takeEvery(GET_BILL_USAGE_PRODUCT, fetchProduct));
  });
  it('Should take the every GET_BILL_USAGE_PRODUCT_BILL_DETAIL actions and call fetch curret usage saga', (result) => {
    expect(result).toEqual(takeEvery(GET_BILL_USAGE_PRODUCT_BILL_DETAIL, fetchProductBillDetail));
  });
  it('Should take the every TOGGLE_BILL_USAGE_PRODUCT_COLLAPSE_STATUS actions and call fetch curret usage saga', (result) => {
    expect(result).toEqual(takeEvery(TOGGLE_BILL_USAGE_PRODUCT_COLLAPSE_STATUS, toggleProductCollapseStatus));
  });
  it('Should take the every GET_BILL_USAGE_PRODUCT_DETAIL actions and call fetch current usage saga', (result) => {
    expect(result).toEqual(takeEvery(GET_BILL_USAGE_PRODUCT_DETAIL, fetchProductDetail));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('billUsageSaga: fetchProductList saga', () => {
  const it = sagaHelper(fetchProductList());
  it('should select idCardReference', (result) => {
    expect(result).toEqual(select(idCardReferenceSelector));
    return 5678;
  });
  it('should select idCard', (result) => {
    expect(result).toEqual(select(idCardSelector));
    return 5678;
  });
  it('Should call api billUsageProductList', (result) => {
    expect(result).toEqual(call(api, billUsageProductList({idCard: 5678})));
    return {
      body: {test: 1}
    };
  });
  it('Should dispatch action to setBillUsageProductList', (result) => {
    expect(result).toEqual(put(setBillUsageProductList({test: 1})));
  });
  it('Should call aexpandFirstProduct', (result) => {
    expect(result).toEqual(call(expandFirstProduct, {test: 1}));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('billUsageSaga: fetchProductDetail saga', () => {
  const it = sagaHelper(fetchProductDetail({payload: {subscriberId: 111111, productType: 'truemoveH', productTypePayload: 'TrueMoveH', productId: 123, subscriptionType: 'POSTPAID'}}));
  it('Should call api billUsageProductDetail', (result) => {
    expect(result).toEqual(call(api, billUsageProductDetail(123, 'TrueMoveH', 111111, 'POSTPAID')));
    return {
      body: {test: 1}
    };
  });
  it('Should dispatch action to setBillUsageProductDetail', (result) => {
    expect(result).toEqual(put(setBillUsageProductDetail(
      {productType: 'truemoveH', subscriberId: 111111, data: {test: 1}})));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
