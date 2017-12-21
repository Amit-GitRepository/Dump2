import api from './api/api.saga';
import dbKeys from '../../config/dbKeys.config';
import localStorage from '../../utils/localStorage.util';
import result from 'lodash/result';
import {call, select, takeLatest} from 'redux-saga/effects';
import {CHANGE_LANGUAGE, DEREGISTER_FCM_TOKEN, REGISTER_FCM_TOKEN, SET_PREFERENCES} from '../actions/index.actions';
import {changeLocale} from '../../language/i18n/helper';
import {deregisterFCMToken, registerFCMToken} from './api/apiHelper';
import {fetchFCMToken} from '../../utils/firebase.util';
import {getSelector} from '../../utils/common.util';
import {setLanguage} from '../../utils/moment.util';

export const ssoidSelector = getSelector('user.profile.uid');

// Action specific SAGAs
export function* setPreferences (action) {
  const language = result(action, 'payload.language');
  yield call(changeLocale, language);
  yield call(setLanguage, language);
}

export function* updateLanguage (action) {
  const language = result(action, 'payload.language');
  yield call(changeLocale, language);
  yield call(setLanguage, language);
  try {
    yield call(localStorage.updateItem, dbKeys.USER_PREFERENCE_KEY, {language: language});
  } catch (e) {
    // console.log(e);
  }
}

export function* registerFCMTokenOnMS () {
  const ssoid = yield select(ssoidSelector);
  try {
    const token = yield call(fetchFCMToken);
    yield call(api, registerFCMToken(ssoid, token));
  } catch (e) {
    // console.log(e);
  }
}

export function* deregisterFCMTokenOnMS () {
  try {
    const token = yield call(fetchFCMToken);
    yield call(api, deregisterFCMToken(token));
  } catch (e) {
    // console.log(e);
  }
}
// Root SAGA
export default function* userSaga () {
  yield takeLatest(CHANGE_LANGUAGE, updateLanguage);
  yield takeLatest(SET_PREFERENCES, setPreferences);
  yield takeLatest(REGISTER_FCM_TOKEN, registerFCMTokenOnMS);
  yield takeLatest(DEREGISTER_FCM_TOKEN, deregisterFCMTokenOnMS);
}
