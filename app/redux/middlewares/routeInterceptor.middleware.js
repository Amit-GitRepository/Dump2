import isEmpty from 'lodash/isEmpty';
import Router, {routeConfig} from '../../routes/index.routes';
import {LOGIN_REQUEST} from '../../redux/actions/index.actions';
import {NavigationActions} from 'react-navigation';
import {showPopup} from '../actions/index.actions';
import {translate} from '../../language/i18n/helper';

const loginRequired = ({routeName, action: nextAction}) => {
  const config = routeConfig[routeName];
  if (!config) return false;
  if (!config.requireLogin) {
    // Check if the next action in the route requires login
    if (nextAction) {
      return loginRequired(nextAction);
    }
    return false;
  }
  return true;
};

const checkIfRouteExist = (action, state) => {
  const newState = Router.router.getStateForAction(action, state);
  return !(state === newState);
};

const isUserAuthorized = () =>
  // TODO: Check if user is authorized to navigate to new route
  true
;

export const generateLoginPopupMessage = (action) => ({
  title: translate('SIDE_MENU__LOGIN_PROMPT_TITLE_TEXT'),
  body: translate('SIDE_MENU__LOGIN_PROMPT_NEED_ACCESS'),
  buttons: [
    {
      title: translate('SIDE_MENU__LOGIN_PROMPT_CANCEL')
    },
    {
      title: translate('SIDE_MENU__LOGIN_PROMPT_LOGIN'),
      actionType: LOGIN_REQUEST,
      nextAction: action
    }
  ]
});

const routeInterceptor = ({dispatch, getState}) => (next) => (action) => {
  if (action.type !== NavigationActions.NAVIGATE && action.type !== NavigationActions.RESET) {
    return next(action);
  }
  if (!checkIfRouteExist(action, getState().nav)) {
    // Route not found
    return null;
  }

  const message = generateLoginPopupMessage(action);

  const userProfile = getState().user;
  // Check if the next route requires login
  if (loginRequired(action)) {
    if (isEmpty(userProfile.profile)) {
      return dispatch(showPopup(message));
    }
    if (!isUserAuthorized(action, userProfile)) {
      return null;
    }
  }

  return next(action);
};

export default routeInterceptor;
