import App from './App.container';
import getStore from './redux/store';
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import './utils/testfairy.util';
import {Provider} from 'react-redux';
import {runtimeErrorHandler} from './utils/error.util';

global.XMLHttpRequest = global.originalXMLHttpRequest ?
  global.originalXMLHttpRequest :
  global.XMLHttpRequest;
global.FormData = global.originalFormData ?
  global.originalFormData :
  global.FormData;

const store = getStore();
runtimeErrorHandler();

export default class iService extends Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('iService', () => iService);
