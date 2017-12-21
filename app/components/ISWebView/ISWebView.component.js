import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './ISWebView.style';
import {OverlaySpinner} from '../Shared';
import {View, WebView} from 'react-native';

// fix https://github.com/facebook/react-native/issues/10865
const patchPostMessageJsCode = `(${String(function () {
  var originalPostMessage = window.postMessage;
  var patchedPostMessage = function (message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = function () {
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  };
  window.postMessage = patchedPostMessage;
  // Execute the javascript code now
  window.postMessage(document.title);
})})();`;

class ISWebView extends Component {

  state = {
    showSpinner: 1
  }

  setNavTitle = (titleText) => {
    const {navigation: {setParams}} = this.props;
    setParams({title: titleText});
  }

  onMessageReceived = (event) => {
    if (event.nativeEvent.data) {
      this.setNavTitle(event.nativeEvent.data);
    }
  }

  onLoadEnd = () => {
    this.setState({showSpinner: 0});
  }

  render () {
    const {url, headers} = this.props;
    const {showSpinner} = this.state;
    return (
      <View style={styles.container}>
        {url && <WebView
          source={
            {
              uri: url,
              headers
            }
          }
          injectedJavaScript={patchPostMessageJsCode}
          javaScriptEnabled={true}
          onMessage={this.onMessageReceived}
          onLoadEnd={this.onLoadEnd}
        />}
        {showSpinner > 0 && <OverlaySpinner showSpinner={showSpinner}/>}
      </View>
    );
  }
}

ISWebView.propTypes = {
  navigation: PropTypes.object,
  url: PropTypes.string.isRequired,
  headers: PropTypes.object
};

export default ISWebView;
