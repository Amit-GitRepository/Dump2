import auth, {handleAuthErrors, showToast} from '../auth.util';
import {NativeModules} from 'react-native';
import {Toast} from '../reactNative.util';

// Had to do inline mock since file mock makes the tests hang
jest.mock('react-native', () => ({
  NativeModules: {
    TrueAuth: {
      initialize: jest.fn(() => Promise.resolve({})),
      logout: jest.fn(() => Promise.resolve(true)),
      login: jest.fn(),
      register: jest.fn(() => Promise.resolve(true)),
      checkLoginAndGetAccessToken: jest.fn(() => Promise.resolve({}))
    },
    RNI18n: {languages: ['en']}
  },
  Platform: {OS: 'ios'}
}));
const {TrueAuth} = NativeModules;

// create custom errors as returned by android and ios sdks
const createCustomError = (code, message) => {
  const error = new Error(JSON.stringify({code, message}));
  return JSON.parse(error.message);
};

describe('AuthUtil: showToast', () => {
  it('Should show the toast notification message if error is native', () => {
    const errorObject = createCustomError('LOGOUT_FAILED_CODE', 'LOGOUT_FAILED');
    showToast(errorObject);
    expect(Toast.show).toHaveBeenCalledWith('LOGOUT_FAILED', Toast.LONG);
  });

  it('Should show the toast notification message if error is custom', () => {
    const errorObject = createCustomError('LOGOUT_FAILED', 'LOGOUT_FAILED');
    showToast(errorObject);
    expect(Toast.show).toHaveBeenCalledWith('Logout unsuccessful, please try again', Toast.LONG);
  });

  it('Should show the toast notification message if error is custom with method defined', () => {
    const errorObject = createCustomError('AUTH_FAILED', 'AUTH_FAILED');
    showToast(errorObject, 'LOGIN');
    expect(Toast.show).toHaveBeenCalledWith('Login unsuccessful, please try again', Toast.LONG);
  });
});

describe('AuthUtil: handleAuthErrors', () => {
  it('Should show the toast notification message if error code is LOGOUT_FAILED', () => {
    const errorObject = createCustomError('LOGOUT_FAILED', 'LOGOUT_FAILED');
    handleAuthErrors(errorObject);
    expect(Toast.show).toHaveBeenCalledWith('Logout unsuccessful, please try again', Toast.LONG);
  });

  it('Should do nothing if error code is AUTH_CANCELLED', () => {
    const errorObject = createCustomError('AUTH_CANCELLED', 'AUTH_CANCELLED');
    handleAuthErrors(errorObject);
    expect(handleAuthErrors(errorObject)).toBeUndefined();
  });
});

describe('AuthUtil: Auth', () => {
  it('login: should call TrueAuth login with language', async () => {
    auth.updateLanguage('en');
    await auth.login();
    expect(TrueAuth.login).toBeCalledWith('en');
  });
  it('register: should call TrueAuth register with language', async () => {
    auth.updateLanguage('en');
    await auth.register();
    expect(TrueAuth.register).toBeCalledWith('en');
  });
  it('Should call the initialize method of native module TrueAuth', async () => {
    await auth.init('th');
    expect(TrueAuth.initialize).toBeCalled();
    expect(auth.selectedLanguage).toEqual('th');
  });
  it('Should call the logout method of native module TrueAuth', async () => {
    await auth.logout();
    expect(TrueAuth.logout).toBeCalled();
  });
  it('Should call the checkExistingLogin method of native module TrueAuth', async () => {
    await auth.checkExistingLogin();
    expect(TrueAuth.checkLoginAndGetAccessToken).toBeCalled();
  });
  it('Should call the updateLanguage method of native module TrueAuth', async () => {
    await auth.updateLanguage('th');
    expect(auth.selectedLanguage).toEqual('th');
  });
});
