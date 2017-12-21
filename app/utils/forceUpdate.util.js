import localStorage from './localStorage.util';
import versionNumber from 'react-native-version-number';
import {Alert, openUrl, Platform} from './reactNative.util';
import {translate} from '../language/i18n/helper';

export async function updateNotificationRetries () {
  const currentVersion = await localStorage.getItem('currentVersion');
  const notificationRetries = await localStorage.getItem('notificationRetries');
  if (notificationRetries === null) {
    await localStorage.setItem('notificationRetries', 0);
  }
  if (currentVersion === null) {
    await localStorage.setItem('currentVersion', versionNumber.appVersion);
  } else if (currentVersion !== versionNumber.appVersion) {
    await localStorage.setItem('notificationRetries', 0);
    await localStorage.setItem('currentVersion', versionNumber.appVersion);
  }
}

export const getAlertConfig = (appLinks, forced) => 
  new Promise((resolve) => {  // It returs a promise because the app needs to wait until the alert is hidden and then dispatch alert hidden action
    const title = translate('UPDATE_TITLE');
    let message = '';
    const cancelable = false;
    const appLink =
      Platform.OS === 'ios'
        ? appLinks.appStoreUrl
        : appLinks.playStoreUrl;
    const buttons = [
      {
        text: translate('ALERT_BUTTON_UPDATE'),
        onPress: () => {
          openUrl(appLink);
          resolve();
        }
      }
    ];
    if (forced) {
      message = Platform.OS === 'ios'
        ? translate('UPDATE_REQUIRED_MESSAGE_APPLE')
        : translate('UPDATE_REQUIRED_MESSAGE_ANDROID');
    } else {
      message = translate('UPDATE_OPTIONAL_MESSAGE');
      buttons.push({text: translate('ALERT_BUTTON_NO_THANKS'), onPress: () => resolve()});
    }
    Alert.alert(title, message, buttons, {cancelable});
  });
