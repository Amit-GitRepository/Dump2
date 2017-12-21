import PayOthersPostpaid from '../../../components/Payment/PayOthersPostpaid/PayOthersPostpaid.component';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import * as actions from '../../../redux/actions/index.actions';

class PayForOthersPostpaidPage extends Component {
  render () {
    const {product, billDetail, toggleProductCheck, toggleProductCollapse, onBillDetailsClick, toggleBillDetailCheck, goToScreen, setPaymentItems} = this.props;
    return (
      <PayOthersPostpaid product={product} dueBills={billDetail} toggleProductCheck={toggleProductCheck} toggleProductCollapse={toggleProductCollapse}
        onBillDetailsClick={onBillDetailsClick} toggleBillDetailCheck={toggleBillDetailCheck} goToScreen={goToScreen} setPaymentItems={setPaymentItems}/>
    );
  }
}
PayForOthersPostpaidPage.defaultProps = {
};

PayForOthersPostpaidPage.propTypes = {
  product: Proptypes.object,
  toggleProductCheck: Proptypes.func,
  billDetail: Proptypes.object,
  toggleProductCollapse: Proptypes.func,
  onBillDetailsClick: Proptypes.func,
  toggleBillDetailCheck: Proptypes.func,
  goToScreen: Proptypes.func,
  setPaymentItems: Proptypes.func
};

export const mapStateToProps = ({payForOthers}) => ({
  product: result(payForOthers, 'product', {}),
  billDetail: result(payForOthers, 'billDetail', {})
});

export const mapDispatchToProps = (dispatch) => ({
  toggleProductCheck: () => dispatch(actions.togglePayOthersProductCheckStatus()),
  toggleProductCollapse: (isCollapsed, accountId) => dispatch(actions.togglePayOthersProductCollapseStatus({isCollapsed, accountId})),
  toggleBillDetailCheck: (accountId) => (invoiceNos, isChecked, checkedBillSum) => {
    const obj = {invoiceNos, isChecked, checkedBillSum, accountId};
    dispatch(actions.setPayOthersProductBillDetailCheckStatus(obj));
  },
  setPaymentItems: (items) => dispatch(actions.setPaymentItems(items)),
  goToScreen: (screenName, params = {}) => dispatch(NavigationActions.navigate({routeName: screenName, params})),
  onBillDetailsClick: (invoiceNo) => dispatch(actions.getInvoicePdf(invoiceNo))
});

export default connect(mapStateToProps, mapDispatchToProps)(PayForOthersPostpaidPage);
