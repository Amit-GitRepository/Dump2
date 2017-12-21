import getCurrentRouteName from 'redux-ga-screen-tracker/utils/transformer.utils';
import Router from '../../routes/index.routes';
import {NavigationActions} from 'react-navigation';

/*
  routes data structure:
  {
    routes: [
      {
        0:{}, // closed Drawer stack
        1:{}, // open Drawer
      }],
    index: 0
  }
*/
const navigationActions = [NavigationActions.BACK, NavigationActions.RESET, NavigationActions.NAVIGATE, NavigationActions.INIT, NavigationActions.SET_PARAMS, NavigationActions.URI];
const initialState = Router.router.getStateForAction({type: NavigationActions.INIT});
const nav = (state = initialState, action) => {
  if (navigationActions.includes(action.type)) {
    if (action.type === NavigationActions.NAVIGATE) {
      const currentScreen = getCurrentRouteName(state.routes[0]);
      /*
      Passing only closed Drawer stack to get the currentScreen.
      Otherwise it might return OpenDrawer as a screen name if the drawer is open
    */
      if (currentScreen === action.routeName) {
        return {...state, index: 0}; // index: 0 defines the state of the drawer. 1 will open and 0 will close.
      }
    }

    /*
    Handling navigation on logout success which requires
    reseting nav state and redirecting to LandingPage
  */
    const newState = Router.router.getStateForAction(action, state) || state;
    let drawerLockMode = 'unlocked';
    // Check if any base route has a nested route open
    const drawerEnable = newState.routes[0].routes.find((elem) => elem.index > 0);
    if (drawerEnable) {
      drawerLockMode = 'locked-closed';
    }
    return {...newState, drawerLockMode};
  } else if (action.type === 'LOGOUT_SUCCESS') {
    const newStack = Router.router.getStateForAction(NavigationActions.reset({index: 0, actions: [NavigationActions.navigate({routeName: 'Landing'})]}), initialState);
    return {...newStack, drawerLockMode: 'unlocked'};
  }
  return state;
};

export default nav;
