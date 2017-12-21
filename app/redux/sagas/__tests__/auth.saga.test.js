import auth from '../../../utils/auth.util';
import authSaga, {initializeAuth, languageSelector, login, logout, networkSelector, register, updateAuthLanguage, verifyExistingLogin} from '../auth.saga';
import result from 'lodash/result';
import sagaHelper from 'redux-saga-testing';
import {call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {CHANGE_LANGUAGE, CHECK_EXISTING_LOGIN,  deregisterFCMToken, LOGIN_REQUEST, loginFailure, loginSuccess,
  LOGOUT_REQUEST, logoutFailure, logoutSuccess, REGISTER_REQUEST, registerFailure, registerFCMToken, registerSuccess, setAccessTokenAndProfile} from '../../actions/index.actions';
import {fetchProductList} from '../billUsage.saga';
import {NavigationActions} from 'react-navigation';
import {setDimension} from '../../../utils/analytics.util';

describe('Auth Saga: Testing the auth Saga', () => {
  const it = sagaHelper(authSaga());
  it('Should takeLatest the check login action', (result) => {
    expect(result).toEqual(takeLatest(CHECK_EXISTING_LOGIN, verifyExistingLogin));
  });
  it('Should takeLatest the login request action', (result) => {
    expect(result).toEqual(takeLatest(LOGIN_REQUEST, login));
  });
  it('Should takeLatest the register request action', (result) => {
    expect(result).toEqual(takeLatest(REGISTER_REQUEST, register));
  });
  it('Should takeLatest the logout request action', (result) => {
    expect(result).toEqual(takeLatest(LOGOUT_REQUEST, logout));
  });
  it('Should takeLatest the change language action', (result) => {
    expect(result).toEqual(takeLatest(CHANGE_LANGUAGE, updateAuthLanguage));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('login: Testing call the login action - success case', () => {
  const it = sagaHelper(login());
  it('Should call login action', (result) => {
    expect(result).toEqual(call(auth.login));
    return {name: 'apurva'};
  });
  it('Should should call loginSuccess action', (result) => {
    expect(result).toEqual(put(loginSuccess({name: 'apurva'})));
  });
  it('Should should call registerFCMToken action', (result) => {
    expect(result).toEqual(put(registerFCMToken()));
  });
  it('Should should call setDimension with userID and fbID', (result) => {
    expect(result).toEqual(call(setDimension, {SSOID: '', FB_ID: ''}));
  });
});

describe('login: Testing call the login action - success case with next action', () => {
  const nextAction = jest.fn();
  const it = sagaHelper(login({payload: nextAction}));
  it('Should call login action', (result) => {
    expect(result).toEqual(call(auth.login));
    return {name: 'apurva'};
  });
  it('Should call loginSuccess action', (result) => {
    expect(result).toEqual(put(loginSuccess({name: 'apurva'})));
  });
  it('Should should call registerFCMToken action', (result) => {
    expect(result).toEqual(put(registerFCMToken()));
  });
  it('Should call setDimension with userID and fbID', (result) => {
    expect(result).toEqual(call(setDimension, {SSOID: '', FB_ID: ''}));
  });
  it('Should fork fetchProduct list as a fork', (result) => {
    expect(result).toEqual(fork(fetchProductList));
  });
  it('Should call next action', (result) => {
    expect(result).toEqual(put(nextAction));
  });
});

describe('login: Testing call the login action - failure case', () => {
  const it = sagaHelper(login());
  it('Should call the login action', (result) => {
    expect(result).toEqual(call(auth.login));
    return new Error('Login call failed');
  });
  it('Should should call loginFailure action', (result) => {
    expect(result).toEqual(put(loginFailure()));
  });
});

describe('register: Testing call the register action - success case', () => {
  const it = sagaHelper(register());
  it('Should call register action', (result) => {
    expect(result).toEqual(call(auth.register));
    return {name: 'xyz'};
  });
  it('Should call registerSuccess action', (result) => {
    expect(result).toEqual(put(registerSuccess({name: 'xyz'})));
  });
  it('Should call setDimension with userID and fbID', (result) => {
    expect(result).toEqual(call(setDimension, {SSOID: '', FB_ID: ''}));
  });
});

describe('register: Testing call the register action - success case with next action', () => {
  const nextAction = jest.fn();
  const it = sagaHelper(register({payload: nextAction}));
  it('Should call register action', (result) => {
    expect(result).toEqual(call(auth.register));
    return {name: 'xyz'};
  });
  it('Should call registerSuccess action', (result) => {
    expect(result).toEqual(put(registerSuccess({name: 'xyz'})));
  });
  it('Should call setDimension with userID and fbID', (result) => {
    expect(result).toEqual(call(setDimension, {SSOID: '', FB_ID: ''}));
  });
  it('Should call next action', (result) => {
    expect(result).toEqual(put(nextAction));
  });
});

describe('register: Testing call the register action - failure case', () => {
  const it = sagaHelper(register());
  it('Should call the register action', (result) => {
    expect(result).toEqual(call(auth.register));
    return new Error('Register call failed');
  });
  it('Should call registerFailure action', (result) => {
    expect(result).toEqual(put(registerFailure()));
  });
});

describe('logout: Testing call the logout action - success case', () => {
  const it = sagaHelper(logout());
  it('Should call logout action', (result) => {
    expect(result).toEqual(call(auth.logout));
  });
  it('Should call logoutSuccess action', (result) => {
    expect(result).toEqual(put(logoutSuccess()));
  });
  it('Should call deregisterFCMToken action', (result) => {
    expect(result).toEqual(put(deregisterFCMToken()));
  });
});

describe('logout: Testing call the logout action - success case with next action', () => {
  const nextAction = jest.fn();
  const it = sagaHelper(logout({payload: nextAction}));
  it('Should call logout action', (result) => {
    expect(result).toEqual(call(auth.logout));
  });
  it('Should call logoutSuccess action', (result) => {
    expect(result).toEqual(put(logoutSuccess()));
  });
  it('Should call deregisterFCMToken action', (result) => {
    expect(result).toEqual(put(deregisterFCMToken()));
  });
  it('Should call next action', (result) => {
    expect(result).toEqual(put(nextAction));
  });
});

describe('logout: Testing call the logout action - failure case', () => {
  const it = sagaHelper(logout());
  it('Should call the logout action', (result) => {
    expect(result).toEqual(call(auth.logout));
    return new Error('Logout call failed');
  });
  it('Should call loginFailure action', (result) => {
    expect(result).toEqual(put(logoutFailure()));
  });
});

describe('loginCheck: do nothing if there is no internet connection', () => {
  const it = sagaHelper(verifyExistingLogin());
  it('Should select network status from state', (result) => {
    expect(result).toHaveProperty('SELECT');
    return false;// return isConnected: false
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('loginCheck: Testing check login action - success case', () => {
  const it = sagaHelper(verifyExistingLogin());
  it('Should select network status from state', (result) => {
    expect(result).toHaveProperty('SELECT');
    return true;// return isConnected: true
  });
  it('Should call check login action', (result) => {
    expect(result).toEqual(call(auth.checkExistingLogin));
    return {profile: {name: 'apurva'}, accessToken: 'xyz'};
  });
  it('Should set the access token action', (result) => {
    expect(result).toEqual(put(setAccessTokenAndProfile({profile: {name: 'apurva'}, accessToken: 'xyz'})));
  });
});

describe('loginCheck: Testing check login action - success case with next action', () => {
  const nextAction = jest.fn();
  const it = sagaHelper(verifyExistingLogin({payload: nextAction}));
  it('Should select network status from state', (result) => {
    expect(result).toHaveProperty('SELECT');
    return true;// return isConnected: true
  });
  it('Should call check login action', (result) => {
    expect(result).toEqual(call(auth.checkExistingLogin));
    return {profile: {name: 'apurva'}, accessToken: 'xyz'};
  });
  it('Should set the access token action', (result) => {
    expect(result).toEqual(put(setAccessTokenAndProfile({profile: {name: 'apurva'}, accessToken: 'xyz'})));
  });
  it('Should call next action', (result) => {
    expect(result).toEqual(put(nextAction));
  });
});

describe('loginCheck: Testing check login action - failure case', () => {
  const it = sagaHelper(verifyExistingLogin());
  it('Should select network status from state', (result) => {
    expect(result).toHaveProperty('SELECT');
    expect(result).toEqual(select(networkSelector));
    return true;// return isConnected: true
  });
  it('Should call the change language action', (result) => {
    expect(result).toEqual(call(auth.checkExistingLogin));
    return new Error('User not logged in');
  });
});

const mockSelectedLanguageAction = {
  payload: {
    language: 'th'
  }
};

describe('updateAuthLanguage: Testing the update auth language Saga', () => {
  const it = sagaHelper(updateAuthLanguage(mockSelectedLanguageAction));
  const language = result(mockSelectedLanguageAction, 'payload.language');
  it('Should call the auth updateLanguage function', (result) => {
    expect(result).toEqual(call(auth.updateLanguage, language));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('initializeAuth: Testing the auth Saga', () => {
  const it = sagaHelper(initializeAuth());
  it('Should select the preferences from state', (result) => {
    expect(result).toEqual(select(languageSelector));
    return 'th';
  });
  it('Should call auth initialization saga', (result) => {
    expect(result).toEqual(call(auth.init, 'th'));
  });
  it('Should call check login saga', (result) => {
    expect(result).toEqual(call(verifyExistingLogin, {payload: NavigationActions.navigate({routeName: 'BillUsage'})}));
  });
});

describe('initializeAuth: Testing the auth Saga', () => {
  const it = sagaHelper(initializeAuth());
  it('Should select the preferences from state', (result) => {
    expect(result).toEqual(select(languageSelector));
    return 'th';
  });
  it('Should call auth initialization saga', (result) => {
    expect(result).toEqual(call(auth.init, 'th'));
  });
  it('Should call check login saga', (result) => {
    expect(result).toEqual(call(verifyExistingLogin, {payload: NavigationActions.navigate({routeName: 'BillUsage'})}));
    return new Error('Something went wrong!');
  });
  it('Should call check login saga', (result) => {
    expect(result).toEqual(put(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Landing'})]
    })));
  });
});
