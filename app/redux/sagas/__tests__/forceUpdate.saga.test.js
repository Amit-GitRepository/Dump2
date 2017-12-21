import forceUpdate, {checkForUpdate} from '../forceUpdate.saga';
import localStorage from '../../../utils/localStorage.util';
import sagaHelper from 'redux-saga-testing';
import {call, put, takeLatest} from 'redux-saga/effects';
import {fetchRemoteConfig} from '../../../utils/firebase.util';
import {
  getAlertConfig,
  updateNotificationRetries
} from '../../../utils/forceUpdate.util';
import {notifyAlertHidden, notifyAlertVisible, STARTUP_SAGA_COMPLETE} from '../../actions/index.actions';
import {versionControlConfig} from '../../../config/versionControl.config';

describe('forceUpdate saga: testing the root saga', () => {
  const it = sagaHelper(forceUpdate());
  it('should take STARTUP_SAGA_COMPLETE action', (result) => {
    expect(result).toEqual(takeLatest(STARTUP_SAGA_COMPLETE, checkForUpdate));
  });
  it('should call nothing after this', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('forceUpdate saga test when current versions on device is lower than min version', () => {
  const versionMock = Object.assign({}, versionControlConfig);
  versionMock.FORCE_UPDATE_MIN_VERSION = '2.0.0';
  versionMock.FORCE_UPDATE_CURRENT_VERSION = '1.5.6';
  const it = sagaHelper(checkForUpdate());
  const appLinks = {
    playStoreUrl: versionMock.FORCE_UPDATE_PLAY_STORE_URL,
    appStoreUrl: versionMock.FORCE_UPDATE_APP_STORE_URL
  };
  it('should call updateNotification retries function', (result) => {
    expect(result).toEqual(call(updateNotificationRetries));
  });
  it('should get notificationRetries from local storage', (result) => {
    expect(result).toEqual(call(localStorage.getItem, 'notificationRetries'));
  });
  it('should fetch the config from firebase', (result) => {
    expect(result).toEqual(call(fetchRemoteConfig));
    return versionMock;
  });
  it('should dispatch the alert visible action', (result) => {
    expect(result).toEqual(put(notifyAlertVisible({forced: true, appLinks})));
  });
  it('should call the getAlertconfig function', (result) => {
    expect(result).toEqual(call(getAlertConfig, appLinks, true));
  });
  it('should dispatch the alert hidden action', (result) => {
    expect(result).toEqual(put(notifyAlertHidden()));
  });
});

describe('forceUpdate saga test when current version on device is in the list of black listed versions', () => {
  const versionMock = Object.assign({}, versionControlConfig);
  versionMock.FORCE_UPDATE_MIN_VERSION = '1.5.0';
  versionMock.FORCE_UPDATE_CURRENT_VERSION = '1.5.6';
  versionMock.FORCE_UPDATE_BLACKLIST_VERSIONS = ['1.5.6', '2.0.0'];
  versionMock.FORCE_UPDATE_NOTIFICATION_RETRY = 5;
  const appLinks = {
    playStoreUrl: versionMock.FORCE_UPDATE_PLAY_STORE_URL,
    appStoreUrl: versionMock.FORCE_UPDATE_APP_STORE_URL
  };
  const it = sagaHelper(checkForUpdate());
  it('should call updateNotification retries function', (result) => {
    expect(result).toEqual(call(updateNotificationRetries));
  });
  it('should get notificationRetries from local storage', (result) => {
    expect(result).toEqual(call(localStorage.getItem, 'notificationRetries'));
    return 1;
  });
  it('should fetch the config from firebase', (result) => {
    expect(result).toEqual(call(fetchRemoteConfig));
    return versionMock;
  });
  it('should dispatch the alert visible action', (result) => {
    expect(result).toEqual(put(notifyAlertVisible({forced: true, appLinks})));
  });
  it('should call the getAlertconfig function', (result) => {
    expect(result).toEqual(call(getAlertConfig, appLinks, true));
  });
  it('should dispatch the alert hidden action', (result) => {
    expect(result).toEqual(put(notifyAlertHidden()));
  });
});

describe('forceUpdate saga test when current version on device is lower than current version but higher than min version', () => {
  const versionMock = Object.assign({}, versionControlConfig);
  versionMock.FORCE_UPDATE_MIN_VERSION = '1.5.0';
  versionMock.FORCE_UPDATE_CURRENT_VERSION = '2.0.0';
  versionMock.FORCE_UPDATE_NOTIFICATION_RETRY = 5;
  const appLinks = {
    playStoreUrl: versionMock.FORCE_UPDATE_PLAY_STORE_URL,
    appStoreUrl: versionMock.FORCE_UPDATE_APP_STORE_URL
  };
  const it = sagaHelper(checkForUpdate());
  it('should call updateNotification retries function', (result) => {
    expect(result).toEqual(call(updateNotificationRetries));
  });
  it('should get notificationRetries from local storage', (result) => {
    expect(result).toEqual(call(localStorage.getItem, 'notificationRetries'));
    return 1;
  });
  it('should fetch the config from firebase', (result) => {
    expect(result).toEqual(call(fetchRemoteConfig));
    return versionMock;
  });
  it('should dispatch the alert visible action', (result) => {
    expect(result).toEqual(put(notifyAlertVisible({forced: false, appLinks})));
  });
  it('should increment the value of notification retries in the local storage by 1', (result) => {
    expect(result).toEqual(call(localStorage.setItem, 'notificationRetries', 2));
  });
  it('should call the getAlertconfig function with forced false', (result) => {
    expect(result).toEqual(call(getAlertConfig, appLinks, false));
  });
  it('should dispatch the alert hidden action', (result) => {
    expect(result).toEqual(put(notifyAlertHidden()));
  });
});

describe('forceUpdate saga test when current version on device is lower than current version but higher than min version with exceeded notification retries', () => {
  const versionMock = Object.assign({}, versionControlConfig);
  versionMock.FORCE_UPDATE_MIN_VERSION = '1.5.0';
  versionMock.FORCE_UPDATE_CURRENT_VERSION = '2.0.0';
  versionMock.FORCE_UPDATE_NOTIFICATION_RETRY = 0;
  const it = sagaHelper(checkForUpdate());
  it('should call updateNotification retries function', (result) => {
    expect(result).toEqual(call(updateNotificationRetries));
  });
  it('should get notificationRetries from local storage', (result) => {
    expect(result).toEqual(call(localStorage.getItem, 'notificationRetries'));
    return 1;
  });
  it('should fetch the config from firebase', (result) => {
    expect(result).toEqual(call(fetchRemoteConfig));
    return versionMock;
  });
  it('should display the optional update alert box', (result) => {
    expect(result).toEqual(undefined);
  });
});
