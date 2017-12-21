/* PaymentStatusDetails: */
import PaymentStatusDetails from '../../components/Payment/PaymentStatusDetails/PaymentStatusDetails.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import {connect} from 'react-redux';

class PaymentStatusDetailsPage extends Component {

  render () {
    const {paymentDetails} = this.props;
    return <PaymentStatusDetails details={paymentDetails} />;
  }
}

PaymentStatusDetailsPage.defaultProps = {
  paymentDetails: {}
};

PaymentStatusDetailsPage.propTypes = {
  paymentDetails: PropTypes.object
};

export const mapStateToProps = ({payment}) => ({
  paymentDetails: result(payment, 'paymentStatus.details', {})
});

export default connect(mapStateToProps)(PaymentStatusDetailsPage);
