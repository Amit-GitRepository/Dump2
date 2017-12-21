import sagaHelper from 'redux-saga-testing';
import startupSaga from '../startup.saga';
import {all, call, put, take} from 'redux-saga/effects';
import {autoDetectMSISDN, hideSpinner, INITIALIZE_DATA_SUCCEEDED, initializeData, showSpinner} from '../../actions/index.actions';
import {fetchTranslations} from '../translations.saga';
import {initializeAuth} from '../auth.saga';
import {initializeFirebase} from '../firebase.saga';

describe('startupSaga: Testing the root Saga', () => {
  const it = sagaHelper(startupSaga());
  it('Should show spinner when a startup saga is called', (result) => {
    expect(result).toEqual(put(showSpinner()));
  });
  it('Should should call initialize data saga', (result) => {
    expect(result).toEqual(put(initializeData()));
  });
  it('Should wait until the initialization in succeeded', (result) => {
    expect(result).toEqual(take(INITIALIZE_DATA_SUCCEEDED));
  });
  it('Should should call initializeAuth saga', (result) => {
    expect(result).toEqual(call(initializeAuth));
    return 'initializeAuth';
  });
  it('Should should call fetchTranslations saga', (result) => {
    expect(result).toEqual(call(fetchTranslations));
    return 'fetchTranslations';
  });
  it('Should should call initializeFirebase saga', (result) => {
    expect(result).toEqual(call(initializeFirebase));
    return 'initializeFirebase';
  });
  it('Should dispatch the detect msisdn', (result) => {
    expect(result).toEqual(put(autoDetectMSISDN()));
    return 'autoDetectMSISDN';
  });
  it('Should should call the fetch translations saga', (result) => {
    expect(result).toEqual(
      all([
        'initializeAuth',
        'fetchTranslations',
        'initializeFirebase',
        'autoDetectMSISDN'
      ])
    ); // Fetch translations
  });
  it('Should hide spinner when the saga is completed', (result) => {
    expect(result).toEqual(put(hideSpinner()));
  });
});
