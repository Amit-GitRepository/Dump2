var rn = require('react-native');

rn.NativeModules.RNI18n = {languages: ['en']};
rn.NativeModules.BlobModule = {BLOB_URI_SCHEME: ''};
rn.NativeModules.FirebaseDynamicLink = {
  addListener: jest.fn(),
  removeListeners: jest.fn()
};
rn.NativeModules.ReactNativeExceptionHandler = {
  setHandlerforNativeException: jest.fn()
};
jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('{}')),
  setItem: jest.fn(() => Promise.resolve()),
  mergeItem: jest.fn(() => Promise.resolve()),
  multiGet: jest.fn(() => Promise.resolve('{}'))
}));
jest.mock('BackHandler', () => ({
  addEventListener: jest.fn()
}));
jest.mock('AppState', () => ({
  currentState: 'inactive',
  addEventListener: jest.fn()
}));
var ReactNativeART = require('react-native/Libraries/ART/ReactNativeART');

ReactNativeART.Group = rn.View;
ReactNativeART.Surface = rn.View;
ReactNativeART.Shape = rn.View;
module.exports = rn;
