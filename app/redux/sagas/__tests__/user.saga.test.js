import api from '../api/api.saga';
import dbKeys from '../../../config/dbKeys.config';
import localStorage from '../../../utils/localStorage.util';
import result from 'lodash/result';
import sagaHelper from 'redux-saga-testing';
import userSaga, {deregisterFCMTokenOnMS, registerFCMTokenOnMS, setPreferences, ssoidSelector, updateLanguage} from '../user.saga';
import {call, select, takeLatest} from 'redux-saga/effects';
import {CHANGE_LANGUAGE, DEREGISTER_FCM_TOKEN, REGISTER_FCM_TOKEN, SET_PREFERENCES} from '../../actions/index.actions';
import {changeLocale} from '../../../language/i18n/helper';
import {deregisterFCMToken, registerFCMToken} from '../api/apiHelper';
import {fetchFCMToken} from '../../../utils/firebase.util';
import {setLanguage} from '../../../utils/moment.util';

describe('userSaga: Testing the root Saga', () => {
  const it = sagaHelper(userSaga());
  it('Should take the latest Change language actions and call update language saga', (result) => {
    expect(result).toEqual(takeLatest(CHANGE_LANGUAGE, updateLanguage));
  });
  it('Should take the latest SET PREFERENCES actions and call set Preference saga', (result) => {
    expect(result).toEqual(takeLatest(SET_PREFERENCES, setPreferences));
  });
  it('Should take the latest REGISTER FCM TOKEN actions and call register FCM token on MS saga', (result) => {
    expect(result).toEqual(takeLatest(REGISTER_FCM_TOKEN, registerFCMTokenOnMS));
  });
  it('Should take the latest DEREGISTER FCM TOKEN actions and call deregister FCM token on MS saga', (result) => {
    expect(result).toEqual(takeLatest(DEREGISTER_FCM_TOKEN, deregisterFCMTokenOnMS));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

const mockSelectedLanguageAction = {
  payload: {
    language: 'th'
  }
};

describe('setPreferences: Testing the set preferences Saga', () => {
  const it = sagaHelper(setPreferences(mockSelectedLanguageAction));
  const language = result(mockSelectedLanguageAction, 'payload.language');
  it('Should call the change locale to set the preferred user language', (result) => {
    expect(result).toEqual(call(changeLocale, language));
  });
  it('Should call the change language for moment', (result) => {
    expect(result).toEqual(call(setLanguage, language));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('updateLanguage: Testing the update language Saga', () => {
  const it = sagaHelper(updateLanguage(mockSelectedLanguageAction));
  const language = result(mockSelectedLanguageAction, 'payload.language');
  it('Should call the change locale to set the preferred user language', (result) => {
    expect(result).toEqual(call(changeLocale, language));
  });
  it('Should call the change language for moment', (result) => {
    expect(result).toEqual(call(setLanguage, language));
  });
  it('Should call update the selected language in local storage', (result) => {
    expect(result).toEqual(call(localStorage.updateItem, dbKeys.USER_PREFERENCE_KEY, {language: language}));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('registerFCMTokenOnMS: Testing the register FCM Token On MS Saga', () => {
  const it = sagaHelper(registerFCMTokenOnMS());
  it('Should select ssoid', (result) => {
    expect(result).toEqual(select(ssoidSelector));
    return 123456;
  });
  it('Should call fetch FCM token', (result) => {
    expect(result).toEqual(call(fetchFCMToken));
    return 123;
  });
  it('Should call api registerFCMToken', (result) => {
    expect(result).toEqual(call(api, registerFCMToken(123456, 123)));
    return {
      body: {success: 'OK'}
    };
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('deregisterFCMTokenOnMS: Testing the register FCM Token On MS Saga', () => {
  const it = sagaHelper(deregisterFCMTokenOnMS());
  it('Should call fetch FCM token', (result) => {
    expect(result).toEqual(call(fetchFCMToken));
    return 123;
  });
  it('Should call api deregisterFCMToken', (result) => {
    expect(result).toEqual(call(api, deregisterFCMToken(123)));
    return {
      body: {success: 'OK'}
    };
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
