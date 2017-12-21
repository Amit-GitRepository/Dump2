import authSaga from '../auth.saga';
import billUsageSaga from '../billUsage.saga';
import combinedSagas from '../index.saga';
import dbInitializerSaga from '../dbInitializer.saga';
import deeplinkSaga from '../deeplink.saga';
import ebillSaga from '../ebill.saga';
import forceUpdate from '../forceUpdate.saga';
import invoicePdfSaga from '../invoicePdf.saga';
import msisdnSaga from '../msisdn.saga';
import otpSaga from '../otp.saga';
import paymentSaga from '../payment.saga';
import popupSaga from '../popup.saga';
import sagaHelper from 'redux-saga-testing';
import startupSaga from '../startup.saga';
import translationSaga from '../translations.saga';
import userSaga from '../user.saga';
import {fork} from 'redux-saga/effects';

describe('combinedSagas: combines all the sagas and return a single saga', () => {
  const it = sagaHelper(combinedSagas());
  it('should combine startup saga', (result) => {
    expect(result).toEqual(fork(startupSaga));
  });
  it('should combine startup saga', (result) => {
    expect(result).toEqual(fork(dbInitializerSaga));
  });
  it('should combine all translation saga', (result) => {
    expect(result).toEqual(fork(translationSaga));
  });
  it('should combine all user preferences saga', (result) => {
    expect(result).toEqual(fork(userSaga));
  });
  it('should combine all msisdn saga', (result) => {
    expect(result).toEqual(fork(msisdnSaga));
  });
  it('should combine all otp saga', (result) => {
    expect(result).toEqual(fork(otpSaga));
  });
  it('should combine auth saga', (result) => {
    expect(result).toEqual(fork(authSaga));
  });
  it('should combine forceUpdate saga', (result) => {
    expect(result).toEqual(fork(forceUpdate));
  });
  it('should combine deeplink saga', (result) => {
    expect(result).toEqual(fork(deeplinkSaga));
  });
  it('should combine billUsage saga', (result) => {
    expect(result).toEqual(fork(billUsageSaga));
  });
  it('should combine ebill saga', (result) => {
    expect(result).toEqual(fork(ebillSaga));
  });
  it('should combine payment saga', (result) => {
    expect(result).toEqual(fork(paymentSaga));
  });
  it('should combine invoicePdf saga', (result) => {
    expect(result).toEqual(fork(invoicePdfSaga));
  });
  it('should combine popup saga', (result) => {
    expect(result).toEqual(fork(popupSaga));
  });
});
