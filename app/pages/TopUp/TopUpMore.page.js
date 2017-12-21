import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import TopUpMore from '../../components/TopUp/TopUpMore/TopUpMore.component';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {setPaymentItems} from '../../redux/actions/index.actions';

class TopUpMorePage extends Component {
  render () {
    const {paymentItems, setPaymentItems, goToScreen} = this.props;
    return (
      <TopUpMore paymentItems={paymentItems} setPaymentItems={setPaymentItems} goToScreen={goToScreen}/>
    );
  }
}

TopUpMorePage.defaultProps = {
  paymentItems: [],
  goToScreen: noop,
  setPaymentItems: noop
};

TopUpMorePage.propTypes = {
  setPaymentItems: PropTypes.func,
  paymentItems: PropTypes.array,
  goToScreen: PropTypes.func
};

export const mapStateToProps = (state) => ({
  paymentItems: result(state, 'payment.paymentItems', [])
});

export const mapDispatchToProps = (dispatch) => ({
  setPaymentItems: (items) => dispatch(setPaymentItems(items)),
  goToScreen: (screen) => dispatch(NavigationActions.navigate({routeName: screen}))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopUpMorePage);
