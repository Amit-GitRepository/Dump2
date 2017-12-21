import Config from 'react-native-config';
import endpoints from '../../../config/endpoints.js';
import noop from 'lodash/noop';
import request from '../../../utils/request.util';
import result from 'lodash/result';
import {apiErrorHandler} from './apiErrorHandler.saga';
import {call, put, select} from 'redux-saga/effects';
import {getSelector} from '../../../utils/common.util';
import {hideSpinner, showSpinner} from '../../actions/index.actions';

const defaultOptions = {
  baseUrl: Config.SERVER_URL,
  endpoint: null,
  query: {},
  method: 'GET',
  data: {},
  pathParam: '', // This can be used to give custom path params like /test/12345 where 12345 is dynamic so here -> pathParam: /12345
  path: null, // this is set by api saga based on the endpoint you specify.. this will be overriden if u specify manually
  intercept: true, // by default api saga will intercept all requests for generic errors
  loader: true, // by default show loader for all requests.
  timeout: parseInt(Config.API_TIMEOUT),
  retryCount: 0,
  headers: {
    'Authorization': `Bearer ${Config.ISERVICE_AUTH_TOKEN}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

export function * addDefaultApiConfig (apiOptions) {
  const headersFromState = {
    'accesstoken': `${yield select(getSelector('user.accessToken'))}`,
    'icard': `${yield select(getSelector('user.profile.idcard'))}`,
    'msisdn': `${yield select(getSelector('user.profile.trueid.mobile'))}`
  };
  const pathParam = apiOptions.pathParam || defaultOptions.pathParam;
  const headers = {...defaultOptions.headers,  ...headersFromState, ...apiOptions.headers};
  return {
    ...defaultOptions,
    ...apiOptions,
    headers,
    path: result(endpoints.api, apiOptions.endpoint, '') + pathParam
  };
}

export default function * apiSaga (apiOptions) {
  if (Config.ENV_NAME !== 'TEST') {
    const apiConfig = yield call(addDefaultApiConfig, apiOptions);

    let showLoader = noop, hideLoader = noop, response = null;
    if (apiConfig.loader) {
      showLoader = () => put(showSpinner());
      hideLoader = () => put(hideSpinner());
    }
    try {
      yield showLoader();
      response = yield call(request, apiConfig);
      yield hideLoader();
    } catch (failedResponse) {
      yield hideLoader();
      return yield call(apiErrorHandler, failedResponse, apiConfig);
    }
    return response;
  } else {
    return endpoints.mock[apiOptions.endpoint];
  }
}
