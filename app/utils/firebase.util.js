import Config from 'react-native-config';
import firebase from 'react-native-firebase';
import {versionControlConfig} from '../config/versionControl.config';

// TODO change based on env
firebase.crash().setCrashCollectionEnabled(false);

async function signInAnonymously () {
  return firebase.auth().signInAnonymously();
}

firebase.messaging().requestPermissions();

firebase.messaging().subscribeToTopic(Config.BROADCAST_TOPIC);

firebase.messaging().onMessage((/* message */) => {
  // TODO
});

firebase.messaging().getInitialNotification()
  .then((/* notification */) => {
    // TODO
  });

export async function setupFirebase () {
  await signInAnonymously(); // returns user
  return new Promise((resolve) => {
    firebase
      .database()
      .ref()
      .on('value', (snapshot) => {
        const value = snapshot.val();
        return resolve(value);
      });
  });
}

firebase.config().setDefaults(versionControlConfig);

export const fetchRemoteConfig = () =>
  firebase
    .config()
    .fetch()
    .then(() => firebase.config().activateFetched())
    .then(() => firebase.config().getValues(Object.keys(versionControlConfig)))
    .then((snapshot) => ({
      FORCE_UPDATE_MIN_VERSION: snapshot.FORCE_UPDATE_MIN_VERSION.val(),
      FORCE_UPDATE_BLACKLIST_VERSIONS: snapshot.FORCE_UPDATE_BLACKLIST_VERSIONS.val().split(','),
      FORCE_UPDATE_CURRENT_VERSION: snapshot.FORCE_UPDATE_CURRENT_VERSION.val(),
      FORCE_UPDATE_PLAY_STORE_URL: snapshot.FORCE_UPDATE_PLAY_STORE_URL.val(),
      FORCE_UPDATE_APP_STORE_URL: snapshot.FORCE_UPDATE_APP_STORE_URL.val(),
      FORCE_UPDATE_NOTIFICATION_RETRY: snapshot.FORCE_UPDATE_NOTIFICATION_RETRY.val()
    }));

export const fetchFCMToken = () =>
  firebase.messaging().getToken()
    .then((token) => token)
    .catch((err) => err);

export default firebase;
