/* eslint react/prop-types: 0 */

import React, {Component} from 'react';
// import {clearPaymentData} from '../../redux/actions/index.actions';
import {StackNavigator} from 'react-navigation';

export default function DismissableStackNavigator (routes, options) {
  const StackNav = StackNavigator(routes, options);

  return class DismissableStackNav extends Component {
    static router = StackNav.router;

    dismissPayment = () => {
      const {state, goBack} = this.props.navigation;
      goBack(state.key);
    }
    componentWillUnmount () {
      // this will make sure that clearing happens after the BACK animation ends.
      // this.props.navigation.dispatch(clearPaymentData());
    }

    render () {
      const {screenProps, navigation} = this.props;
      const props = {
        ...screenProps,
        dismiss: this.dismissPayment
      };
      return (
        <StackNav
          navigation={navigation}
          screenProps={props}
        />
      );
    }
  };
}
