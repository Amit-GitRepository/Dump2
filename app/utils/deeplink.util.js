import {NativeEventEmitter, NativeModules} from 'react-native';

const {FirebaseDynamicLink} = NativeModules;

const dynamicLinkEmitter = new NativeEventEmitter(FirebaseDynamicLink);

class DeepLink {
  static subscription;

  addListener (listenser) {
    if (listenser) {
      this.subscription = dynamicLinkEmitter.addListener(
        'onDeepLinkReceived',
        (link) => listenser(link)
      );
    }
  }

  removeListener () {
    if (this.subscription) {
      this.subscription.remove();
    }
  }
}

const deepLink = new DeepLink();

export default deepLink;