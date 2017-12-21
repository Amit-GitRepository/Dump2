import RNRestart from 'react-native-restart';
import {Alert} from './reactNative.util';
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';
import {translate} from '../language/i18n/helper';

export const runtimeErrorHandler = () => {
  setJSExceptionHandler((error) => {
    recoverableErrorUI(error);
  });
  setNativeExceptionHandler((/* reason*/) => {
    // console.log('Critical Native Error. RN based UI can't be launched. So just log it from here somewhere', reason); //TODO
    // The UI for this is present in the native code.
  });
};

const recoverableErrorUI = (/* error*/) => {
  Alert.alert(translate('ERROR_TITLE_RECOVERABLE'), translate('ERROR_NOTE_RECOVERABLE'),
    [
      {text: translate('ERROR_IGNORE_BUTTON')},
      {text: translate('ERROR_RESTART_APP'), onPress: () => {
        // log the error somewhere - console.log(error)
        RNRestart.Restart();
      }, style: 'cancel'}
    ],
    {cancelable: false});
};
