import api from '../api.saga';
import Config from 'react-native-config';
import sagaHelper from 'redux-saga-testing';
import {apiErrorHandler, retryApi} from '../../../sagas/api/apiErrorHandler.saga';
import {call} from 'redux-saga/effects';
import {throwException} from '../../../../utils/common.util';
import {verifyExistingLogin} from '../../auth.saga';

describe('api error handler: shouldn\'t intercept if the intercept flag is false', () => {
  const errorResponse  = {
    status: 401,
    error: {message: 'A dummy error response'}
  };
  const apiConfigWithNoIntercept = {
    endpoint: '/test',
    query: {},
    method: 'GET',
    intercept: false, // by default api saga will intercept all requests for generic errors
    loader: true, // by default show loader for all requests.
    retryCount: 0
  };
  const it = sagaHelper(apiErrorHandler(errorResponse, apiConfigWithNoIntercept));
  it('should throw the error back to caller', (result) => {
    expect(result).toEqual(call(throwException, errorResponse.error));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('api error handler: should intercept error response', () => {
  const errorResponse  = {
    status: 401,
    error: {message: 'A dummy error response'}
  };
  const apiConfig = {
    endpoint: '/test',
    query: {},
    method: 'GET',
    intercept: true, // by default api saga will intercept all requests for generic errors
    loader: true, // by default show loader for all requests.
    retryCount: 0
  };
  const it = sagaHelper(apiErrorHandler(errorResponse, apiConfig));
  it('should call the verifyExistingLogin', (result) => {
    expect(result).toEqual(call(verifyExistingLogin));
  });
  it('should call retryApi', (result) => {
    expect(result).toEqual(call(retryApi, apiConfig, errorResponse));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('api error handler: fallback if couldnt make a decision', () => {
  const errorResponse  = {
    status: null, // No status so interceptor cant make a decision
    error: {message: 'A dummy error response'}
  };
  const apiConfig = {
    endpoint: '/test',
    query: {},
    method: 'GET',
    intercept: true, // by default api saga will intercept all requests for generic errors
    loader: true, // by default show loader for all requests.
    retryCount: 0
  };
  const it = sagaHelper(apiErrorHandler(errorResponse, apiConfig));
  it('should throw the error response', (result) => {
    expect(result).toEqual(call(throwException, errorResponse.error));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('retry apis: should retry the api call', () => {
  const errorResponse  = {
    status: null, // No status so interceptor cant make a decision
    error: {message: 'A dummy error response'}
  };
  const apiConfig = {
    endpoint: '/test',
    query: {},
    method: 'GET',
    intercept: true, // by default api saga will intercept all requests for generic errors
    loader: true, // by default show loader for all requests.
    retryCount: 0
  };
  const it = sagaHelper(retryApi(apiConfig, errorResponse));
  it('should call the api saga again with retry count 1', (result) => {
    const newApiConfig = {...apiConfig, retryCount: 1};
    expect(result).toEqual(call(api, newApiConfig));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('retry apis: should throw back the exception when MAX_RETRIES reach', () => {
  const errorResponse  = {
    status: null, // No status so interceptor cant make a decision
    error: {message: 'A dummy error response'}
  };
  const apiConfig = {
    endpoint: '/test',
    query: {},
    method: 'GET',
    intercept: true, // by default api saga will intercept all requests for generic errors
    loader: true, // by default show loader for all requests.
    retryCount: Config.API_MAX_RETRIES
  };
  const it = sagaHelper(retryApi(apiConfig, errorResponse));
  it('should call the api saga again with retry count 1', (result) => {
    expect(result).toEqual(call(throwException, errorResponse));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
