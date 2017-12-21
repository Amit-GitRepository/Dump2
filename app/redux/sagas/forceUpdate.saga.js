import localStorage from '../../utils/localStorage.util';
import versionNumber from 'react-native-version-number';
import {call, put, takeLatest} from 'redux-saga/effects';
import {fetchRemoteConfig} from '../../utils/firebase.util';
import {forceUpdateFailed, notifyAlertHidden, notifyAlertVisible, STARTUP_SAGA_COMPLETE} 
  from '../actions/index.actions';
import {getAlertConfig, updateNotificationRetries} from '../../utils/forceUpdate.util';

export function* checkForUpdate () {
  try {
    yield call(updateNotificationRetries);
    const notificationRetries = yield call(localStorage.getItem, 'notificationRetries');
    const snapshot = yield call(fetchRemoteConfig);
    const appLinks = {
      playStoreUrl: snapshot.FORCE_UPDATE_PLAY_STORE_URL,
      appStoreUrl: snapshot.FORCE_UPDATE_APP_STORE_URL
    };
    const currentVersionOnDevice = versionNumber.appVersion;
    if (
      snapshot.FORCE_UPDATE_MIN_VERSION > currentVersionOnDevice ||
      snapshot.FORCE_UPDATE_BLACKLIST_VERSIONS.indexOf(currentVersionOnDevice) > -1
    ) {
      yield put(notifyAlertVisible({forced: true, appLinks}));
      yield call(getAlertConfig, appLinks, true);
      yield put(notifyAlertHidden());
    } else if (
      snapshot.FORCE_UPDATE_CURRENT_VERSION > currentVersionOnDevice &&
      notificationRetries <= snapshot.FORCE_UPDATE_NOTIFICATION_RETRY
    ) {
      yield put(notifyAlertVisible({forced: false, appLinks}));
      yield call(localStorage.setItem, 'notificationRetries', notificationRetries + 1);
      yield call(getAlertConfig, appLinks, false);
      yield put(notifyAlertHidden());
    }
  } catch (e) {
    put(forceUpdateFailed());
  }
}

export default function* forceUpdate () {
  yield takeLatest(STARTUP_SAGA_COMPLETE, checkForUpdate);
}