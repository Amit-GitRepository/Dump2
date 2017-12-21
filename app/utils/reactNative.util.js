// This file imports RN modules which might be used in pages/sagas
// where we should not import react-native modules
// such that in future if we plan to migrate to web,
// we only need to change in this file
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
import {Alert, Linking, Platform} from 'react-native';

const deviceInfo = {
  id: DeviceInfo.getUniqueID(),
  name: DeviceInfo.getBrand(),
  model: DeviceInfo.getModel()
};

const openUrl = (url) => Linking.canOpenURL(url).then((supported) => {
  if (!supported) {
    return Promise.reject(new Error(`Could not open the url: ${url}`));
  } else {
    return Linking.openURL(url);
  }
});

module.exports = {
  Toast,
  Alert,
  Platform,
  deviceInfo,
  openUrl
};
