import getStore from '../../../redux/store';
import routeInterceptor, {generateLoginPopupMessage} from '../routeInterceptor.middleware';
import {showPopup} from '../../actions/index.actions';

const next = jest.fn((action) => action);

const mockStoreLocatorAction = {
  type: 'Navigation/NAVIGATE',
  routeName: 'StoreLocator'
};

const mockBillUsageAction = {
  type: 'Navigation/NAVIGATE',
  routeName: 'BillUsage'
};

const mockNestedNavigationAction = {
  type: 'Navigation/NAVIGATE',
  routeName: 'Landing',
  action: {
    type: 'Navigation/NAVIGATE',
    routeName: 'BillUsage'
  }
};

const mockIllegalNavigationAction = {
  type: 'Navigation/NAVIGATE',
  routeName: 'ABCXYZ'
};

describe(('Route Interceptor: User not logged in case'), () => {
  const userNotLoggedInStore = getStore({user: {accessToken: null, profile: {}}});
  const interceptor = routeInterceptor(userNotLoggedInStore)(next);
  it('Should bypass the inteceptor for Store locator navigation action', () => {
    expect(interceptor(mockStoreLocatorAction)).toEqual(next(mockStoreLocatorAction));
  });
  it('Should trigger a login action when trying to navigate to bill usage', () => {
    expect(interceptor(mockBillUsageAction)).toEqual(userNotLoggedInStore.dispatch(showPopup(generateLoginPopupMessage(mockBillUsageAction))));
  });
  it('Should trigger a login action when nested navigation requires login access', () => {
    expect(interceptor(mockNestedNavigationAction)).toEqual(userNotLoggedInStore.dispatch(showPopup(generateLoginPopupMessage(mockNestedNavigationAction))));
  });
});

describe(('Route Interceptor: User logged in case'), () => {
  const userLoggedInStore = getStore({user: {accessToken: '1234', profile: {name: 'abc'}}});
  const interceptor = routeInterceptor(userLoggedInStore)(next);
  it('Should bypass the inteceptor for Store locator navigation action', () => {
    expect(interceptor(mockStoreLocatorAction)).toEqual(next(mockStoreLocatorAction));
  });
  it('Should bypass the inteceptor for bill usage navigation action', () => {
    expect(interceptor(mockBillUsageAction)).toEqual(next(mockBillUsageAction));
  });
});

describe(('Route Interceptor: User logged in but route does not exist'), () => {
  const userLoggedInStore = getStore({user: {accessToken: '1234', profile: {name: 'abc'}}});
  const interceptor = routeInterceptor(userLoggedInStore)(next);
  it('Should not perform the route transition when the user is not authorized to navigate to route', () => {
    expect(interceptor(mockIllegalNavigationAction)).toEqual(null);
  });
});
