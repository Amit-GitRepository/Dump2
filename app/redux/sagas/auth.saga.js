import auth, {handleAuthErrors} from '../../utils/auth.util';
import result from 'lodash/result';
import {call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {fetchProductList} from './billUsage.saga';
import {getSelector} from '../../utils/common.util';
import {NavigationActions} from 'react-navigation';
import {setDimension} from '../../utils/analytics.util';
import * as actions from '../actions/index.actions';

// Action specific SAGAs
export function* login (action) {
  const nextAction = action && action.payload;
  try {
    const userProfile = yield call(auth.login);
    yield put(actions.loginSuccess(userProfile));
    yield put(actions.registerFCMToken());
    // set dimension values for SSOID and FB_ID based on user profile
    yield call(setDimension,
      {SSOID: result(userProfile, 'uid', ''), FB_ID: result(userProfile, 'facebook_id', '')});
    yield fork(fetchProductList);
    if (nextAction) {
      yield put(nextAction);
    }
  } catch (e) {
    handleAuthErrors(e, 'LOGIN');
    yield put(actions.loginFailure());
  }
}

export function* register (action) {
  const nextAction = action && action.payload;
  try {
    const userProfile = yield call(auth.register);
    yield put(actions.registerSuccess(userProfile));
    yield call(setDimension,
      {SSOID: result(userProfile, 'uid', ''), FB_ID: result(userProfile, 'facebook_id', '')});
    if (nextAction) {
      yield put(nextAction);
    }
  } catch (e) {
    handleAuthErrors(e, 'REGISTER');
    yield put(actions.registerFailure());
  }
}

export function* logout (action) {
  const nextAction = action && action.payload;
  try {
    yield call(auth.logout);
    yield put(actions.logoutSuccess());
    yield put(actions.deregisterFCMToken());
    if (nextAction) {
      yield put(nextAction);
    }
  } catch (e) {
    handleAuthErrors(e);
    yield put(actions.logoutFailure());
  }
}

export function* updateAuthLanguage (action) {
  const language = result(action, 'payload.language');
  yield call(auth.updateLanguage, language);
}

export const networkSelector = getSelector('networkStatus.isConnected');

export function* verifyExistingLogin (action) {
  // TODO: refactor it in v4, as call for networkStatus is async
  const isConnected = yield select(networkSelector);
  const nextAction = action && action.payload;
  // check for existing login only if there is internet connection
  // PS: SDK onResume method hangs in case if there is no internet connection
  if (isConnected) {
    const accessTokenAndProfile = yield call(auth.checkExistingLogin);
    yield put(actions.setAccessTokenAndProfile(accessTokenAndProfile));
    if (nextAction) {
      yield put(nextAction);
    }
  }
}

export const languageSelector = getSelector('user.language');

// TODO: refactor the auth initialization
export function* initializeAuth () {
  try {
    const language = yield select(languageSelector);
    yield call(auth.init, language);
    yield call(verifyExistingLogin, {payload: NavigationActions.navigate({routeName: 'BillUsage'})});
    // Requesting product list upon login.
    yield fork(fetchProductList);
  } catch (e) {
    handleAuthErrors(e);
    // Handle auth exceptions
    yield put(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Landing'})]
      })
    );
  }
}

// Root SAGA
export default function* authSaga () {
  yield takeLatest(actions.CHECK_EXISTING_LOGIN, verifyExistingLogin);
  yield takeLatest(actions.LOGIN_REQUEST, login);
  yield takeLatest(actions.REGISTER_REQUEST, register);
  yield takeLatest(actions.LOGOUT_REQUEST, logout);
  yield takeLatest(actions.CHANGE_LANGUAGE, updateAuthLanguage);
}
