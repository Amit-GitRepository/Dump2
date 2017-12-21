import api from '../api/api.saga';
import paymentSaga, {fetchPayOtherProducts, paymentForExistingCustomer, paymentForNewCustomer, paymentForNonLoginUser, removeExisingCard, showPaymentMethods} from '../payment.saga.js';
import sagaHelper from 'redux-saga-testing';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {CARD_TYPE, PAYMENT_STATUS} from '../../../config/payment.config';
import {deleteCard, getProductFromServiceNo, getSavedCards, payForExistingCustomer} from '../api/apiHelper';
import {getSelector} from '../../../utils/common.util';
import {NavigationActions} from 'react-navigation';
import {PAY_EXISTING_CUSTOMER, PAY_NEW_CUSTOMER, PRE_LOGIN_PAYMENT, REMOVE_EXISTING_CARD, setPaymentProducts, setPaymentStatus, setSavedCards, SHOW_PAYMENT_METHODS} from '../../actions/index.actions';
import {Toast} from '../../../utils/reactNative.util';

describe('paymentSaga: should bind actions to sagas', () => {
  const it = sagaHelper(paymentSaga());
  it(' should takeLatest SHOW_PAYMENT_METHODS', (result) => {
    expect(result).toEqual(takeLatest(SHOW_PAYMENT_METHODS, showPaymentMethods));
  });
  it('should takeLatest PAY_NEW_CUSTOMER', (result) => {
    expect(result).toEqual(takeLatest(PAY_NEW_CUSTOMER, paymentForNewCustomer));
  });
  it('should takeLatest PAY_EXISTING_CUSTOMER', (result) => {
    expect(result).toEqual(takeLatest(PAY_EXISTING_CUSTOMER, paymentForExistingCustomer));
  });
  it('should takeLatest PRE_LOGIN_PAYMENT', (result) => {
    expect(result).toEqual(takeLatest(PRE_LOGIN_PAYMENT, paymentForNonLoginUser));
  });
  it('should takeLatest PAY_EXISTING_CUSTOMER', (result) => {
    expect(result).toEqual(takeLatest(REMOVE_EXISTING_CARD, removeExisingCard));
  });
});

describe('payForExistingCustomer => success: should call payForExistingCustomer api', () => {
  const it = sagaHelper(paymentForExistingCustomer({payload: {type: CARD_TYPE.SAVED, customerId: 123, paymentItems: [], formData: {saveCard: true}, selectedCard: {id: 123}}}));
  it('should get ssoID from store', (result) => {
    expect(result).toMatchSnapshot(select(getSelector('user.profile.ssoID')));
    return 'ssoID';
  });
  it('encrypt the ID and call api with payload', (result) => {
    expect(result).toEqual(call(api, payForExistingCustomer('encryptedID', {'cardID': 123, 'customerId': 123, 'payables': [], 'saveCard': true})));
    return {status: 200, body: {'cardID': 123, 'customerId': 123, 'payables': [], 'saveCard': true}};
  });
  it('should dispatch a Payment success action', (result) => {
    const details = {'cardID': 123, 'customerId': 123, 'payables': [], 'saveCard': true};
    expect(result).toEqual(put(setPaymentStatus({status: PAYMENT_STATUS.SUCCESS, details})));
  });
  it('should dispatch a Payment success action', (result) => {
    expect(result).toEqual(put(NavigationActions.navigate({'routeName': 'PaymentStatus'})));
  });
});

describe('showPaymentMethods => success: should show possible payment methods', () => {
  const it = sagaHelper(showPaymentMethods());
  it('should get ssoID from store', (result) => {
    expect(result).toMatchSnapshot(select(getSelector('user.profile.ssoID')));
    return 'ssoID';
  });
  it('Should call getSavedCards api to show default credit card', (result) => {
    expect(result).toEqual(call(api, getSavedCards('encryptedID')));
    return {status: 200, body: [{id: 'card1'}]};
  });
  it('Should call setSavedCards with status', (result) => {
    expect(result).toEqual(put(setSavedCards([{id: 'card1'}])));
  });
});
describe('showPaymentMethods => failure: should show toast with message', () => {
  const it = sagaHelper(showPaymentMethods());
  it('should get ssoID from store', (result) => {
    expect(result).toMatchSnapshot(select(getSelector('user.profile.ssoID')));
    return 'ssoID';
  });
  it('Should call getSavedCards api to show default credit card', () => new Error('API failed'));
  it('should call Toast if api fails', (result) => {
    expect(result).toEqual(call(Toast.show, 'Unable to get saved cards', Toast.SHORT));
  });
});

describe('removeExisingCard => success: should removed exising card', () => {
  const it = sagaHelper(removeExisingCard({payload: 'someCardID'}));
  it('should get ssoID from store', (result) => {
    expect(result).toMatchSnapshot(select(getSelector('user.profile.ssoID')));
    return 'ssoID';
  });
  it('Should call deleteCard api to show default credit card', (result) => {
    expect(result).toEqual(call(api, deleteCard('encryptedID', 'someCardID')));
  });
});
describe('removeExisingCard => failure: should removed exising card', () => {
  const it = sagaHelper(removeExisingCard({payload: 'someCardID'}));
  it('should get ssoID from store', (result) => {
    expect(result).toMatchSnapshot(select(getSelector('user.profile.ssoID')));
    return 'ssoID';
  });
  it('Should call deleteCard api to show default credit card',  () => new Error('API failed'));
  it('should call Toast if api fails', (result) => {
    expect(result).toEqual(call(Toast.show, 'Unable to delete card', Toast.SHORT));
  });
});

describe('fetchPayOtherProducts => success should navigate to payOthersPostpaid screen', () => {
  const mockAction = {payload: {serviceNo: '1234'}};
  const mockResponse = {
    body: {
      tol: [{
        productId: '12345'
      }],
      tmhPostpaid: [],
      tvs: []
    }
  };
  const it = sagaHelper(fetchPayOtherProducts(mockAction));
  it('should call the getProductFromServiceNo api', (result) => {
    expect(result).toEqual(call(api, getProductFromServiceNo(mockAction.payload.serviceNo)));
    return mockResponse;
  });
  it('should call the setPaymentProducts action', (result) => {
    expect(result).toEqual(put(setPaymentProducts({serviceNo: '1234', products: mockResponse.body})));
  });
  it('should navigate to PayOthersPostpaid screen', (result) => {
    expect(result).toEqual(put(NavigationActions.navigate({'routeName': 'PayOthersPostpaid'})));
  });
});

describe('fetchPayOtherProducts => success should navigate to PayOthersTopUp screen when product is prepaid', () => {
  const mockAction = {payload: {serviceNo: '1234'}};
  const mockResponse = {
    body: {
      tol: [],
      tmhPrepaid: [{
        a: 'abc'
      }],
      tmhPostpaid: [],
      tvs: []
    }
  };
  const it = sagaHelper(fetchPayOtherProducts(mockAction));
  it('should call the getProductFromServiceNo api', (result) => {
    expect(result).toEqual(call(api, getProductFromServiceNo(mockAction.payload.serviceNo)));
    return mockResponse;
  });
  it('should call the setPaymentProducts action', (result) => {
    expect(result).toEqual(put(setPaymentProducts({serviceNo: '1234', products: mockResponse.body})));
  });
  it('should navigate to PayOthersPostpaid screen', (result) => {
    expect(result).toEqual(put(NavigationActions.navigate({'routeName': 'PayOthersTopUp'})));
  });
});

describe('fetchPayOtherProducts => failure should show Toast when the response Object is empty', () => {
  const mockAction = {payload: {serviceNo: '1234'}};
  const mockResponse = {
    body: {}
  };
  const it = sagaHelper(fetchPayOtherProducts(mockAction));
  it('should call the getProductFromServiceNo api', (result) => {
    expect(result).toEqual(call(api, getProductFromServiceNo(mockAction.payload.serviceNo)));
    return mockResponse;
  });
  it('should call the setPaymentProducts action', (result) => {
    expect(result).toEqual(put(setPaymentProducts({serviceNo: '1234', products: mockResponse.body})));
  });
  it('should navigate to PayOthersPostpaid screen', (result) => {
    expect(result).toEqual(call(Toast.show, 'Invalid service number entered', Toast.LONG));
  });
});
