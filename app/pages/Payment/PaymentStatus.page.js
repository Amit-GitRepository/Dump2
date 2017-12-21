/* PaymentStatus: */
import noop from 'lodash/noop';
import PaymentStatus from '../../components/Payment/PaymentStatus/PaymentStatus.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

class PaymentStatusPage extends Component {
  goToHome = () => {
    this.props.navigation.goBack();
    this.props.navigation.goBack();
  }

  goToDetails = () => {
    this.props.goToScreen('PaymentStatusDetails');
  }

  render () {
    const {paymentStatus} = this.props;
    const status = result(paymentStatus, 'status', '');
    const details = result(paymentStatus, 'details', {});
    return <PaymentStatus status={status} details={details} goToHome={this.goToHome} goToDetails={this.goToDetails}/>;
  }
}

PaymentStatusPage.defaultProps = {
  paymentStatus: {},
  navigation: {},
  goToScreen: noop
};

PaymentStatusPage.propTypes = {
  paymentStatus: PropTypes.object,
  navigation: PropTypes.object,
  goToScreen: PropTypes.func
};

export const mapStateToProps = (state) => ({
  paymentStatus: result(state, 'payment.paymentStatus', {})
});

export const mapDispatchToProps = (dispatch) => ({
  goToScreen: (screen) => dispatch(NavigationActions.navigate({routeName: screen}))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStatusPage);
