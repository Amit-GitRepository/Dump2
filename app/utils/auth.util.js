import {NativeModules, Platform} from 'react-native';
import {Toast} from './reactNative.util';
import {translate} from '../language/i18n/helper';

const {TrueAuth} = NativeModules;

export const showToast = (error, method = null) => {
  const {code, message} = error;

  // custom error message
  if (code === message) {
    const i18nKey = method ? `AUTH__${method}_${message}` : `AUTH__${message}`;
    return Toast.show(translate(i18nKey), Toast.LONG);
  }

  // native error message
  return Toast.show(message, Toast.LONG);
};

export const handleAuthErrors = (error, method) => {
  const {code} = error;

  switch (code) {
  case 'AUTH_FAILED':
  case 'GET_ACCESS_TOKEN_FAILED':
  case 'JSON_PARSE_FAILED':
  case 'LOGOUT_FAILED': {
    showToast(error, method);
    break;
  }
  case 'AUTH_CANCELLED':
  case 'CHECK_EXISTING_LOGIN_FAILED': {
    // do nothing
    break;
  }
  }
};

class Auth {
  static selectedLanguage;

  init (language) {
    this.selectedLanguage = language;
    if (Platform.OS === 'ios') {
      return TrueAuth.initialize();
    }
  }

  login () {
    return TrueAuth.login(this.selectedLanguage);
  }

  register () {
    return TrueAuth.register(this.selectedLanguage);
  }

  checkExistingLogin () {
    return TrueAuth.checkLoginAndGetAccessToken();
  }

  logout () {
    return TrueAuth.logout();
  }

  updateLanguage (language) {
    this.selectedLanguage = language;
  }
}

const auth = new Auth();

export default auth;
