import Config from 'react-native-config';
import Router from '../../routes/index.routes';
import {all, call, put, take, takeEvery} from 'redux-saga/effects';
import {DEEP_LINK_RECEIVED, hideSpinner, showSpinner, STARTUP_SAGA_COMPLETE} from '../actions/index.actions';
import {Toast} from '../../utils/reactNative.util';

export function * handleDeepLink (action) {

  yield put(showSpinner());
  // GET the path from the payload url
  const path = action.payload.split(Config.DEEPLINK_BASE_URL)[1];
  // Generate a route action based on the url path
  const routeAction = Router.router.getActionForPathAndParams(path);
  // Check if the route action is valid
  if (routeAction) {
    yield put(routeAction);
  } else {
    Toast.show('Route not found', Toast.LONG);
  }
  yield put(hideSpinner());
}

// All the app startup related operation should go here
export default function * deeplinkSaga () {

  // Wait for startup saga complete and deep link received action
  const result = yield all([
    take(STARTUP_SAGA_COMPLETE),
    take(DEEP_LINK_RECEIVED)
  ]);

  // handle the pending deeplink
  yield call(handleDeepLink, result[1]);

  // Attach the listener for future deep link actions
  yield takeEvery(DEEP_LINK_RECEIVED, handleDeepLink);
}
