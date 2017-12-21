import getCurrentRouteName from 'redux-ga-screen-tracker/utils/transformer.utils';
import PaymentOptions from '../../components/Payment/PaymentOptions/PaymentOptions.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {paymentRouteConfig} from '../../routes/payment.routes';
import {pickBy, result} from 'lodash';

class PaymentOptionsPage extends Component {

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    const {screenProps, nav, goBack} = this.props;
    const currentRouteName = getCurrentRouteName(nav);
    const backDisabledRoutes = pickBy(paymentRouteConfig, ['showBack', false]);
    if (Object.keys(backDisabledRoutes).indexOf(currentRouteName) > -1) {
      screenProps.dismiss();
    } else {
      goBack();
    }
    return true;
  };

  render () {
    const {goToScreen, paymentItems} = this.props;
    return (
      <PaymentOptions goToScreen={goToScreen} paymentItems={paymentItems}/>
    );
  }
}

PaymentOptionsPage.propTypes = {
  goToScreen: PropTypes.func,
  goBack: PropTypes.func,
  nav: PropTypes.object,
  paymentItems: PropTypes.array,
  screenProps: PropTypes.object
};

export const mapStateToProps = ({payment, nav}) => ({
  paymentItems: result(payment, 'paymentItems'),
  nav: nav
});

export const mapDispatchToProps = (dispatch) => ({
  goToScreen: (screen) => dispatch(NavigationActions.navigate({routeName: screen})),
  goBack: () => dispatch(NavigationActions.back())
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentOptionsPage);
