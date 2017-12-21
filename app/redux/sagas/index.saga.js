import authSaga from './auth.saga';
import billUsageSaga from './billUsage.saga';
import dbInitializerSaga from './dbInitializer.saga';
import deeplinkSaga from './deeplink.saga';
import ebillSaga from './ebill.saga';
import forceUpdateSaga from './forceUpdate.saga';
import invoicePdfSaga from './invoicePdf.saga';
import msisdnSaga from './msisdn.saga';
import otpSaga from './otp.saga';
import paymentSaga from './payment.saga';
import popupSaga from './popup.saga';
import startupSaga from './startup.saga';
import translationSaga from './translations.saga';
import userSaga from './user.saga';
import {fork} from 'redux-saga/effects';

export default function* () {
  yield fork(startupSaga);
  yield fork(dbInitializerSaga);
  yield fork(translationSaga);
  yield fork(userSaga);
  yield fork(msisdnSaga);
  yield fork(otpSaga);
  yield fork(authSaga);
  yield fork(forceUpdateSaga);
  yield fork(deeplinkSaga);
  yield fork(billUsageSaga);
  yield fork(ebillSaga);
  yield fork(paymentSaga);
  yield fork(invoicePdfSaga);
  yield fork(popupSaga);
}
