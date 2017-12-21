import api from './api/api.saga'; // TODO: change mockAPI to API once microserice is ready
import result from 'lodash/result';
import {billUsageProductBillDetail, deleteCard, getProductFromServiceNo, getSavedCards, payForExistingCustomer, payForNewCustomer, payForNonLoginUser, tokeniseCard} from './api/apiHelper';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {CARD_TYPE, PAYMENT_STATUS} from '../../config/payment.config';
import {GET_PRODUCTS_PAYMENT, PAY_EXISTING_CUSTOMER, PAY_NEW_CUSTOMER, PRE_LOGIN_PAYMENT, REMOVE_EXISTING_CARD, removeCardSuccessful, REPLACE_CARD_AND_PAY, setPaymentProducts, setPaymentStatus, setPayOthersProductBillDetail, setPayOthersProductCollapseStatus, setSavedCards, SHOW_PAYMENT_METHODS, TOGGLE_PAYOTHERS_PRODUCT_COLLAPSE_STATUS} from '../actions/index.actions';
import {getSelector} from '../../utils/common.util';
import {NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/reactNative.util';
import {translate} from '../../language/i18n/helper';

export function* paymentForNewCustomer ({payload}) {
  try {
    const ssoID = yield select(getSelector('user.profile.uid'));
    const {paymentItems, formData} = payload;
    const {token} = yield call(getCardToken, formData);
    const requestPayload = {payables: paymentItems, saveCard: formData.saveCard, token};
    const response = yield call(api, payForNewCustomer(ssoID, requestPayload));
    yield put(setPaymentStatus({
      status: PAYMENT_STATUS.SUCCESS,
      details: response.body
    }));
    yield put(NavigationActions.navigate({'routeName': 'PaymentStatus'})); // payment successful
  } catch (error) {
    if (error && error.code !== 'invalid_card') {
      yield put(setPaymentStatus({
        status: PAYMENT_STATUS.FAIL,
        details: {message: result(error, 'message')}
      }));
      yield put(NavigationActions.navigate({'routeName': 'PaymentStatus'})); // handle request failed case
    }
  }
}

export function* paymentForNonLoginUser ({payload}) {
  try {
    const {paymentItems, formData} = payload;
    const {token} = yield call(getCardToken, formData);
    const requestPayload = {payables: paymentItems[0], token};
    const response = yield call(api, payForNonLoginUser(requestPayload));
    yield put(setPaymentStatus({
      status: PAYMENT_STATUS.SUCCESS,
      details: response.body
    }));
    yield put(NavigationActions.navigate({'routeName': 'PaymentStatus'})); // payment successful
  } catch (error) {
    if (error && error.code !== 'invalid_card') {
      yield put(setPaymentStatus({
        status: PAYMENT_STATUS.FAIL,
        details: {message: result(error, 'message')}
      }));
      yield put(NavigationActions.navigate({'routeName': 'PaymentStatus'})); // handle request failed case
    }
  }
}

export function* paymentForExistingCustomer ({payload}) {
  try {
    const ssoID = yield select(getSelector('user.profile.uid'));
    const {type, customerId, paymentItems, formData, selectedCard} = payload;
    if (customerId) {
      let requestPayload = {payables: paymentItems, customerId, saveCard: formData.saveCard};
      if (type === CARD_TYPE.SAVED) {
        requestPayload = {...requestPayload, cardID: selectedCard.id};
      } else {
        const {token, fingerprint} = yield call(getCardToken, formData);
        requestPayload = {...requestPayload, token, fingerprint};
      }
      const response = yield call(api, payForExistingCustomer(ssoID, requestPayload));
      yield put(setPaymentStatus({
        status: PAYMENT_STATUS.SUCCESS,
        details: response.body
      }));
      yield put(NavigationActions.navigate({'routeName': 'PaymentStatus'})); // payment successful
    }
  } catch (error) {
    if (error && error.code !== 'invalid_card') {
      yield put(setPaymentStatus({
        status: PAYMENT_STATUS.FAIL,
        details: {message: result(error, 'message')}
      }));
      yield put(NavigationActions.navigate({'routeName': 'PaymentStatus'})); // handle request failed case
    }
  }
}

export function* replaceCardAndPay ({payload}) {
  try {
    yield call(removeExisingCard, {payload: payload.id});
    yield call(paymentForExistingCustomer, {payload});
  } catch (e) {
    yield call(Toast.show, 'Unable to make payment', Toast.SHORT); // hardcoded string because we are not sure what to do here(yet)
  }
}

export function* removeExisingCard ({payload}) {
  try {
    const ssoID = yield select(getSelector('user.profile.uid'));
    yield call(api, deleteCard(ssoID, payload));
    yield put(removeCardSuccessful(payload));
  } catch (e) {
    yield call(Toast.show, 'Unable to delete card', Toast.SHORT); // hardcoded string because we are not sure what to do here(yet)
  }
}

function* getCardToken ({name, number, expirationDate, securityCode}) {
  try {
    let cardData = {name, number, 'security_code': securityCode};
    const [expirationMonth, expirationYear] = expirationDate.split('/');
    cardData = {...cardData, 'expiration_month': Number(expirationMonth), 'expiration_year': Number(expirationYear)};
    const tokenResponse = yield call(api, tokeniseCard({card: cardData})); // Token from credit card info
    const token = result(tokenResponse, 'body.id');
    const fingerprint = result(tokenResponse, 'body.card.fingerprint');
    return {token, fingerprint};
  } catch (error) {
    yield call(Toast.show, 'Unable to fetch card token', Toast.SHORT);
    throw error;
  }
}
export function* fetchPayOtherProducts (action) {
  try {
    const {serviceNo} = action.payload;
    const response = yield call(api, getProductFromServiceNo(serviceNo));
    const products = response.body;
    yield put(setPaymentProducts({serviceNo, products}));
    if (Object.keys(products).length === 0) {
      yield call(Toast.show, translate('PAYMENT_INVALID_SERVICE_NO'), Toast.LONG);
    } else if (products.tmhPrepaid && products.tmhPrepaid.length > 0) {
      yield put(NavigationActions.navigate({routeName: 'PayOthersTopUp'}));
    } else {
      yield put(NavigationActions.navigate({routeName: 'PayOthersPostpaid'}));
    }
  } catch (err) {
    Toast.show(translate('PAYMENT_INVALID_SERVICE_NO'), Toast.LONG);
  }
}

export function* payOtherProductToggleCollapseStatus ({payload}) {
  try {
    const {isCollapsed, accountId} = payload;
    const billDetailSelector = getSelector('payForOthers.billDetail');
    const allBillDetail = yield select(billDetailSelector);
    const selectedBillDetail = result(allBillDetail, `${accountId}`, null);
    if (!selectedBillDetail) {
      const billDetail = yield call(api, billUsageProductBillDetail(accountId, false));
      yield put(setPayOthersProductBillDetail({data: billDetail.body}));
    }
    yield put(setPayOthersProductCollapseStatus({isCollapsed}));
  } catch (err) {
    //
  }
}

export function* showPaymentMethods () {
  try {
    const ssoID = yield select(getSelector('user.profile.uid'));
    const res = yield call(api, getSavedCards(ssoID));
    const savedCards = result(res, 'body', []);
    yield put(setSavedCards(savedCards));
  } catch (e) {
    yield call(Toast.show, 'Unable to get saved cards', Toast.SHORT);// hardcoded string because we are not sure what to do here(yet)
  }
}

export default function * paymentSaga () {
  yield takeLatest(SHOW_PAYMENT_METHODS, showPaymentMethods);
  yield takeLatest(PAY_NEW_CUSTOMER, paymentForNewCustomer);
  yield takeLatest(PAY_EXISTING_CUSTOMER, paymentForExistingCustomer);
  yield takeLatest(PRE_LOGIN_PAYMENT, paymentForNonLoginUser);
  yield takeLatest(REMOVE_EXISTING_CARD, removeExisingCard);
  yield takeLatest(GET_PRODUCTS_PAYMENT, fetchPayOtherProducts);
  yield takeLatest(TOGGLE_PAYOTHERS_PRODUCT_COLLAPSE_STATUS, payOtherProductToggleCollapseStatus);
  yield takeLatest(REPLACE_CARD_AND_PAY, replaceCardAndPay);
}
