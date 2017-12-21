jest.mock('react-native-config', () => ({API_TIMEOUT: '1123', ISERVICE_AUTH_TOKEN: '123'}));
jest.mock('../../../../config/endpoints.js', () => ({
  api: {TEST: 'test'}
}));
import apiSaga, {addDefaultApiConfig} from '../api.saga';

import request from '../../../../utils/request.util';
import sagaHelper from 'redux-saga-testing';
import {apiErrorHandler} from '../../../sagas/api/apiErrorHandler.saga';
import {call, put} from 'redux-saga/effects';
import {hideSpinner, showSpinner} from '../../../actions/index.actions';

describe('Default payload interceptor: The interceptor adds default api configuration payloads', () => {
  const testApiOptions   = () => ({
    endpoint: 'TEST',
    baseUrl: 'http://localhost:3000'
  });
  const expectedApiConfig = {
    'baseUrl': 'http://localhost:3000',
    'data': {},
    'endpoint': 'TEST',
    'headers': {'Accept': 'application/json', 'Authorization': 'Bearer 123', 'Content-Type': 'application/json', 'accesstoken': '1234', 'icard': '1234', 'msisdn': '1234'},
    'intercept': true,
    'loader': true,
    'method': 'GET',
    'path': 'test',
    'query': {},
    'pathParam': '',
    'retryCount': 0,
    'timeout': 1123
  };
  const it = sagaHelper(addDefaultApiConfig(testApiOptions()));
  it('should call the selector on redux store to fetch accessToken', (result) => {
    expect(result).toHaveProperty('SELECT');
    return 1234;// return a dummy msisdn
  });
  it('should call the selector on redux store to fetch Icard', (result) => {
    expect(result).toHaveProperty('SELECT');
    return '1234';// return a dummy msisdn
  });
  it('should call the selector on redux store to fetch msisdn', (result) => {
    expect(result).toHaveProperty('SELECT');
    return '1234';// return a dummy msisdn
  });

  it('should add the default api configuration at the end', (result) => {
    expect(result).toEqual(expectedApiConfig);
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('api saga: success case: The main api calling saga', () => {
  const testApiOptions   = () => ({
    endpoint: 'TEST',
    baseUrl: 'http://localhost:3000'
  });
  const afterDefaultApiConfigOptions = {
    'baseUrl': 'http://localhost:3000',
    'data': {},
    'endpoint': 'TEST',
    'intercept': true,
    'loader': true,
    'method': 'GET',
    'path': 'test',
    'query': {},
    'retryCount': 0,
    'timeout': 1123
  };
  const it = sagaHelper(apiSaga(testApiOptions()));
  it('should add the default api configuration', (result) => {
    expect(result).toEqual(call(addDefaultApiConfig, testApiOptions()));
    return afterDefaultApiConfigOptions; // return a dummy apiConfig
  });
  it('should call actions for loaders if loader flag is on (by default its on)', (result) => {
    expect(result).toEqual(put(showSpinner()));
  });
  it('should call the api saga with the request', (result) => {
    expect(result).toEqual(call(request, afterDefaultApiConfigOptions));
  });
  it('should call actions for hiding the loader if loader flag is on (by default its on)', (result) => {
    expect(result).toEqual(put(hideSpinner()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('api saga: failure case: The main api calling saga', () => {
  const testApiOptions   = () => ({
    endpoint: 'TEST',
    baseUrl: 'http://localhost:3000'
  });
  const afterDefaultApiConfigOptions = {
    'endpoint': 'TEST',
    'baseUrl': 'http://localhost:3000',
    'intercept': true,
    'loader': true,
    'method': 'GET',
    'path': 'test',
    'query': {},
    'timeout': 1123
  };
  const sampleApiError = new Error({message: 'Dummy api error'});
  const it = sagaHelper(apiSaga(testApiOptions()));
  it('add default config', () => afterDefaultApiConfigOptions);// return a dummy apiConfig
  it('call the show loader', (result) => {
    expect(result).toEqual(put(showSpinner()));
  });
  it('should call the api saga with the request', () => sampleApiError); // Throw an api error
  it('call the hide loader', (result) => {
    expect(result).toEqual(put(hideSpinner()));
  });
  it('should call the api error handler saga', (result) => {
    expect(result).toEqual(call(apiErrorHandler, sampleApiError, afterDefaultApiConfigOptions));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('api saga: case where loader is turned off', () => {
  const testApiOptions   = () => ({
    endpoint: 'TEST',
    baseUrl: 'http://localhost:3000',
    loader: false
  });
  const afterDefaultApiConfigOptions = {
    'endpoint': 'TEST',
    'baseUrl': 'http://localhost:3000',
    'intercept': true,
    'loader': false,
    'method': 'GET',
    'path': 'test',
    'query': {},
    'timeout': 1123
  };
  const it = sagaHelper(apiSaga(testApiOptions()));
  it('add default config', () => afterDefaultApiConfigOptions);// return a dummy apiConfig
  it('should not do anything if loader flag is off', () => null);
  it('should call the api saga with the request', (result) => {
    expect(result).toEqual(call(request, afterDefaultApiConfigOptions));
  });
  it('should not do anything if loader flag is off', () => null);
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
