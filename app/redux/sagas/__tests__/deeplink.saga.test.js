import Config from 'react-native-config';
import deeplinkSaga, {handleDeepLink} from '../deeplink.saga';
import Router from '../../../routes/index.routes';
import sagaHelper from 'redux-saga-testing';
import {all, call, put, take, takeEvery} from 'redux-saga/effects';
import {DEEP_LINK_RECEIVED, hideSpinner, showSpinner, STARTUP_SAGA_COMPLETE} from '../../actions/index.actions';

describe('deeplinkSaga: Testing the root saga', () => {
  const mockStartupCompletedAction = {
    type: STARTUP_SAGA_COMPLETE,
    payload: null
  };
  const mockDeepLinkReceivedAction = {
    type: DEEP_LINK_RECEIVED,
    payload: ''
  };
  const it = sagaHelper(deeplinkSaga());
  it('Should take the startupSaga completed and deeplink received actions', (result) => {
    expect(result).toEqual(all([take(STARTUP_SAGA_COMPLETE), take(DEEP_LINK_RECEIVED)]));
    return [mockStartupCompletedAction, mockDeepLinkReceivedAction];
  });
  it('Should call the deeplink handler with the pending deeplink action', (result) => {
    expect(result).toEqual(call(handleDeepLink, mockDeepLinkReceivedAction));
  });
  it('Should watch for incoming deeplinks', (result) => {
    expect(result).toEqual(takeEvery(DEEP_LINK_RECEIVED, handleDeepLink));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('handleDeepLink: Testing the handle deep link saga', () => {
  const path = 'billusage';
  const mockDeepLinkReceivedAction = {
    type: DEEP_LINK_RECEIVED,
    payload: `http://${Config.DEEPLINK_BASE_URL}${path}`
  };
  const it = sagaHelper(handleDeepLink(mockDeepLinkReceivedAction));
  it('Should show the spinner', (result) => {
    expect(result).toEqual(put(showSpinner()));
  });
  it('Should dispacth an action for navigating to Bill and usage screen', (result) => {
    const routeAction = Router.router.getActionForPathAndParams(path);
    expect(result).toEqual(put(routeAction));
  });
  it('Should show the hide the spinner after route transition', (result) => {
    expect(result).toEqual(put(hideSpinner()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});