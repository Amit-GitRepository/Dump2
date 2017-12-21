import getCurrentRouteName from 'redux-ga-screen-tracker/utils/transformer.utils';
import nav from '../nav.reducer';
import Router from '../../../routes/index.routes';
import {NavigationActions} from 'react-navigation';

describe('nav reducer', () => {
  const initialState = Router.router.getStateForAction({type: NavigationActions.INIT});
  it('should have routes and index defined', () => {
    expect(initialState.routes).toBeDefined();
    expect(initialState.index).toBeDefined();
  });
  it('should not navigate if currentScreen is equal to the routename passed in navigation action', () => {
    const currentScreen = getCurrentRouteName(initialState);
    const newState = nav(initialState, NavigationActions.navigate({routeName: currentScreen}));
    expect(initialState).toEqual(newState);
  });
  it('should navigate to the landing page if actionType is LOGOUT_SUCCESS and reset the nav state', () => {
    const action = {
      type: 'LOGOUT_SUCCESS'
    };
    const newState = nav(initialState, action);
    expect(getCurrentRouteName(newState)).toEqual('Landing');
  });
});
