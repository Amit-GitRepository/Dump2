import DeepLink from './utils/deeplink.util';
import ExitOnDoubleBack from 'exit-on-double-back';
import firebase from './utils/firebase.util';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import Popup from './pages/Popup/Popup.page';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import Router from './routes/index.routes';
import SplashScreen from 'react-native-splash-screen';
import uniq from 'lodash/uniq';
import {addNavigationHelpers, NavigationActions} from 'react-navigation';
import {appContainerStyle, statusBarStyle} from './themes/application.styles';
import {AppState, NetInfo, StatusBar, View} from 'react-native';
import {connect} from 'react-redux';
import {deeplinkReceived, notifyAlertHidden, registerFCMToken, setNetworkStatus} from './redux/actions/index.actions';
import {getAlertConfig} from './utils/forceUpdate.util';
import {menuConfig} from './config/sideMenu.config';
import {OverlaySpinner} from './components/Shared';
import {translate} from './language/i18n/helper';

class App extends Component {

  previousAppState = AppState.currentState

  componentWillMount () {
    SplashScreen.hide();
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.props.setNetworkStatus
    );
    AppState.addEventListener('change', this._handleAppStateChange);
    DeepLink.addListener(this._handleLinkReceived);
    firebase.messaging().onTokenRefresh(() => {
      if (!isEmpty(this.props.profile))
        this.props.registerFCMToken();
    });
  }

  componentWillUnmount () {
    NetInfo.isConnected.removeEventListener('connectionChange', this.props.setNetworkStatus);
    AppState.removeEventListener('change', this._handleAppStateChange);
    DeepLink.removeListener();
  }

  _handleLinkReceived = (link) => {
    if (link) {
      this.props.deeplinkReceived(link);
    }
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      if ((this.previousAppState === 'inactive' || this.previousAppState === 'background') && !this.props.forceUpdate.isUpdateAlertVisible && this.props.forceUpdate.forced) {
        getAlertConfig(this.props.forceUpdate.appLinks, true).then(() => this.props.hideAlert());
      }
      NetInfo.isConnected.fetch().then(this.props.setNetworkStatus);
    }
    this.previousAppState = nextAppState;
  };

  //  To get all the unique screen that a user can navigate to using side menu
  _getScreenList = () => {
    const screenList = [];
    menuConfig.map((itemGroup) => {
      itemGroup.nodes.map((item) => {
        screenList.push(item.screen);
        if (item.nodes) {
          item.nodes.map((subItem) => {
            screenList.push(subItem.screen);
          });
        }
      });
    });
    return uniq(screenList);
  }

  render () {
    const {showSpinner, dispatch, nav, language, profile, goBack} = this.props;
    return (
      <View style={appContainerStyle}>
        <StatusBar translucent {...statusBarStyle}/>
        <ExitOnDoubleBack exitableRoutes={isEmpty(profile)
          ? ['Landing']
          : this._getScreenList()} toastMessage={translate('EXIT_APP_CONFIRMATION')} doubleBackInterval={3000} backHandler={goBack} nav={nav}>
          <Router screenProps={{language, keyboardDismissMode: 'on-drag', drawerLockMode: nav.drawerLockMode}} navigation={addNavigationHelpers({dispatch, state: nav})}/>
        </ExitOnDoubleBack>
        <Popup />
        <OverlaySpinner showSpinner={showSpinner}/>
      </View>
    );
  }
}

App.defaultProps = {
  hideAlert: noop,
  deeplinkReceived: noop,
  goBack: noop
};
App.propTypes = {
  showSpinner: Proptypes.number.isRequired,
  forceUpdate: Proptypes.object,
  setNetworkStatus: Proptypes.func.isRequired,
  dispatch: Proptypes.func.isRequired,
  nav: Proptypes.object.isRequired,
  language: Proptypes.string.isRequired,
  profile: Proptypes.object,
  hideAlert: Proptypes.func,
  deeplinkReceived: Proptypes.func,
  goBack: Proptypes.func,
  registerFCMToken: Proptypes.func
};

export const mapStateToProps = ({spinner, nav, user, forceUpdate}) => ({
  showSpinner: result(spinner, 'count', 0),
  nav,
  forceUpdate,
  language: user.language,
  profile: user.profile
});

export const mapDispatchToProps = (dispatch) => ({
  dispatch,
  hideAlert: () => dispatch(notifyAlertHidden()),
  setNetworkStatus: (isConnected) => dispatch(setNetworkStatus(isConnected)),
  deeplinkReceived: (link) => dispatch(deeplinkReceived(link)),
  goBack: () => dispatch(NavigationActions.back()),
  registerFCMToken: () => dispatch(registerFCMToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
