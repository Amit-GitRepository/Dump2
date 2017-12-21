import {getRouteMap, getScreenTrackingConfig, setAppName, setAppVersion,
  setTrackUncaughtExceptions, setUser, tracker, trackEvent, trackException, trackPurchaseEvent} from '../analytics.util';

import {routeConfig} from '../../routes/index.routes';

const customDimensions = {
  SSOID: 'anonymous',
  APP_NAME: 'iService',
  CLIENT_ID: '',
  LAT_LONG: '',
  FB_ID: '',
  DEVICE_ID: ''
};

describe('Google analytics tracker methods', () => {
  it('setUserId should call tracker.setUser', () => {
    const userId = '111';
    setUser(userId);
    expect(tracker.setUser).toBeCalledWith(userId);
  });
  it('setAppName should call tracker.setAppName', () => {
    const appName = 'Dummy Name';
    setAppName(appName);
    expect(tracker.setAppName).toBeCalledWith(appName);
  });
  it('setAppVersion should call tracker.setAppVersion', () => {
    const appVersion = 'v.0.0';
    setAppVersion(appVersion);
    expect(tracker.setAppVersion).toBeCalledWith(appVersion);
  });
  it('setTrackUncaughtExceptions should call tracker.setTrackUncaughtExceptions', () => {
    setTrackUncaughtExceptions();
    expect(tracker.setTrackUncaughtExceptions).toBeCalledWith(true);
  });
  it('trackEvent should call tracker.trackEvent', () => {
    trackEvent('testcategory', 'testaction', {label: 'v1.0.3', value: 22});
    expect(tracker.trackEventWithCustomDimensionValues).toBeCalledWith('testcategory', 'testaction', {label: 'v1.0.3', value: 22}, customDimensions);
  });
  it('trackException should call tracker.trackEvent', () => {
    const error = 'error message';
    trackException(error, true);
    expect(tracker.trackException).toBeCalledWith(error, true);
  });
  it('trackPurchaseEvent should call tracker.trackEvent', () => {
    const purchase = {
      id: 'xx11',
      name: 'Top up',
      price: 50,
      quantity: 1
    };
    const transaction = {
      id: 'xx22',
      revenue: 60
    };
    trackPurchaseEvent(purchase, transaction);
    expect(tracker.trackPurchaseEvent).toBeCalledWith(purchase, transaction, 'Ecommerce', 'Purchase');
  });
});

describe('getScreenTrackingConfig should return config object', () => {
  const screenTrackingConfig = getScreenTrackingConfig();
  const navAction = ['Navigation/NAVIGATE', 'Navigation/BACK', 'Navigation/RESET'];
  const gaRouteMap = getRouteMap(routeConfig);
  it('should have a tracker object', () => {
    expect(screenTrackingConfig.tracker).toMatchObject(tracker);
  });
  it('should have Navigation Store Key', () => {
    expect(screenTrackingConfig.navStoreKey).toMatch('nav');
  });
  it('should have Navigation actions', () => {
    expect(screenTrackingConfig.navActions).toMatchObject(navAction);
  });
  it('should have routeConfig', () => {
    expect(screenTrackingConfig.gaRouteMap).toMatchObject(gaRouteMap);
  });
  it('should have custom dimension', () => {
    expect(screenTrackingConfig.customDimensions).toMatchObject(customDimensions);
  });
});

describe('getRouteConfig should return map between gaScreenName and screenName', () => {
  const gaRouteMap = getRouteMap(routeConfig);
  it('should return an object with screen name mapping', () => {
    expect(gaRouteMap).toBeDefined();
  });
  it('should have screenName for a defined route', () => {
    const routeInfo = Object.keys(routeConfig)[0];
    expect(gaRouteMap[routeInfo]).toEqual(routeConfig[routeInfo].gaScreenName);
  });
});
