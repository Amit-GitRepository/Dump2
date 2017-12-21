import ComponentWithTab from '../../../components/ComponentWithTab/ComponentWithTab.component';
import PayOthersCard from '../../../components/Payment/PayOthersCard/PayOthersCard.component';
import Proptypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {getPaymentProducts} from '../../../redux/actions/index.actions';
 
export class PayOthersInputPage extends ComponentWithTab {
  renderWithTab () {
    const {fetchPaymentProducts} = this.props;
    return (
      <PayOthersCard fetchPaymentProducts={fetchPaymentProducts} />
    );
  }
}
 
PayOthersInputPage.propTypes = {
  fetchPaymentProducts: Proptypes.func
};

export const mapDispatchToProps = (dispatch) => ({
  fetchPaymentProducts: (serviceNo) => dispatch(getPaymentProducts({serviceNo}))
});
   
export default connect(null, mapDispatchToProps)(PayOthersInputPage);