/* CardDetails: Currently VIEW is also kept in this file.
  View will be moved to component folder once UI gets finalised*/

import noop from 'lodash/noop';
import PaymentCard from '../../components/Payment/PaymentCard/PaymentCard.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isEmpty, result} from 'lodash';
import {MAXIMUM_SAVE_CARD_COUNT} from '../../config/payment.config';
import {payForExistingCustomer, payNewCustomer, preLoginPayment, replaceCardAndPay, showPaymentMethods, showPopup} from '../../redux/actions/index.actions';

class CardDetails extends Component {

  onFormSubmit = (formData) => this.props.addCard({
    ...formData, amount: result(this.props, 'paymentItems[0].amount', 0)
  })

  componentWillMount () {
    const {userProfile, showPaymentMethods} = this.props;
    if (!isEmpty(userProfile)) {
      showPaymentMethods();
    }
  }

  render () {
    const {userProfile, paymentItems, savedCards, payForNewCustomer, payForExistingCustomer, preLoginPayment, showPopup, replaceCard} = this.props;
    return (
      <PaymentCard showPopup={showPopup} paymentItems={paymentItems} replaceCard={replaceCard} preLoginPayment={preLoginPayment} userProfile={userProfile} onFormSubmit={this.onFormSubmit} cardLimit={MAXIMUM_SAVE_CARD_COUNT} payForNewCustomer={payForNewCustomer} payForExistingCustomer={payForExistingCustomer} savedCards={savedCards}/>
    );
  }
}

CardDetails.defaultProps = {
  addCard: noop,
  showPopup: noop,
  payForExistingCustomer: noop,
  payForNewCustomer: noop,
  preLoginPayment: noop,
  paymentItems: [],
  showPaymentMethods: noop,
  replaceCard: noop,
  savedCards: {},
  userProfile: {}
};

CardDetails.propTypes = {
  addCard: PropTypes.func,
  showPopup: PropTypes.func,
  payForExistingCustomer: PropTypes.func,
  replaceCard: PropTypes.func,
  payForNewCustomer: PropTypes.func,
  preLoginPayment: PropTypes.func,
  paymentItems: PropTypes.array,
  showPaymentMethods: PropTypes.func,
  savedCards: PropTypes.object,
  userProfile: PropTypes.object
};

export const mapStateToProps = ({payment, user}) => ({
  paymentItems: payment.paymentItems,
  savedCards: payment.savedCards,
  userProfile: user.profile
});

export const mapDispatchToProps = (dispatch) => ({
  addCard: bindActionCreators(payNewCustomer, dispatch),
  payForExistingCustomer: bindActionCreators(payForExistingCustomer, dispatch),
  replaceCard: bindActionCreators(replaceCardAndPay, dispatch),
  payForNewCustomer: bindActionCreators(payNewCustomer, dispatch),
  preLoginPayment: bindActionCreators(preLoginPayment, dispatch),
  showPopup: (message) => dispatch(showPopup(message)),
  showPaymentMethods: bindActionCreators(showPaymentMethods, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(CardDetails);
