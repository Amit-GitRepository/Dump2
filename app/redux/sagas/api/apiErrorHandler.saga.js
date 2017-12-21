import api from './api.saga';
import Config from 'react-native-config';
import {call} from 'redux-saga/effects';
import {throwException} from '../../../utils/common.util';
import {verifyExistingLogin} from '../auth.saga';

export function * apiErrorHandler (response, apiConfig) {
  const {error, status} = response;
  if (!apiConfig.intercept) {
    return yield call(throwException, error);
  }
  switch (status) {
  // case 404: ...do something ...;break;
  case 401: {
    yield call(verifyExistingLogin);
    return yield call(retryApi, apiConfig, response); // This would retry the api MAX_RETRIES and return if successful;
  }
  }
  yield call(throwException, error); // return error instead, if you want the caller to get the response;
}

export function * retryApi (apiConfig, errorResponse) {
  const {retryCount} = apiConfig;
  const apiConfigToHit = {...apiConfig, retryCount: retryCount + 1};
  if (apiConfig.retryCount >= Config.API_MAX_RETRIES) {
    return yield call(throwException, errorResponse);
  }
  return yield call(api, apiConfigToHit);
}
