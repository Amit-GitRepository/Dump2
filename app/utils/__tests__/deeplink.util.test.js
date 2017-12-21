import Deeplink from '../deeplink.util.js';
import noop from 'lodash/noop';
import {NativeModules} from 'react-native';

const {FirebaseDynamicLink} = NativeModules;

describe('Deeplink utility', () => {

  beforeEach(() => {
    // Rest all the mock information
    FirebaseDynamicLink.addListener.mockClear();
    FirebaseDynamicLink.removeListeners.mockClear();

    // Clear the existing deeplink subscription
    Deeplink.subscription = null;
  });

  it('addListener: Should call listener for deeplink', () => {
    Deeplink.addListener(noop);
    expect(FirebaseDynamicLink.addListener).toBeCalled();
  });

  it('addListener: Should not call deeplink addlistener when no listener is passed ', () => {
    Deeplink.addListener();
    expect(FirebaseDynamicLink.addListener).not.toBeCalled();
  });

  it('removeListener: Should call deeplink remove listerer when an existing listener is attached', () => {
    Deeplink.addListener(noop);
    Deeplink.removeListener();
    expect(FirebaseDynamicLink.removeListeners).toBeCalled();
  });

  it('removeListener: Should not call deeplink remove listerer when no listener is attached', () => {
    Deeplink.removeListener();
    expect(FirebaseDynamicLink.removeListeners).not.toBeCalled();
  });

});