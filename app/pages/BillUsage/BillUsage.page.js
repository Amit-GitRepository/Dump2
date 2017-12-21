import BillUsage from '../../components/BillUsage/BillUsage/BillUsage.component';
import ComponentWithTab from '../../components/ComponentWithTab/ComponentWithTab.component';
import Proptypes from 'prop-types';
import React from 'react';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import * as actions from '../../redux/actions/index.actions';

class BillUsagePage extends ComponentWithTab {
  renderWithTab () {
    const {username, productList, toggleBillDetailCheck, productDetail, billDetail, getProductBillDetails, goToScreen, toggleProductCheck, toggleProductCollapse, setPaymentItems, onBillDetailsClick, getProductCurrentUsage, currentLanguage} = this.props;
    return (
      <BillUsage productList={productList} productDetail={productDetail} billDetail={billDetail}  username={username} goToScreen={goToScreen}
        toggleProductCheck={toggleProductCheck} toggleProductCollapse={toggleProductCollapse} getProductBillDetails={getProductBillDetails} toggleBillDetailCheck = {toggleBillDetailCheck}
        setPaymentItems={setPaymentItems} onBillDetailsClick={onBillDetailsClick} getProductCurrentUsage={getProductCurrentUsage} currentLanguage={currentLanguage}
      />
    );
  }
}

BillUsagePage.propTypes = {
  username: Proptypes.string,
  goToScreen: Proptypes.func,
  productList: Proptypes.object,
  productDetail: Proptypes.object,
  billDetail: Proptypes.object,
  toggleProductCheck: Proptypes.func,
  toggleProductCollapse: Proptypes.func,
  toggleBillDetailCheck: Proptypes.func,
  setPaymentItems: Proptypes.func,
  getProductCurrentUsage: Proptypes.func,
  currentLanguage: Proptypes.string
};

export const mapStateToProps = (state) => ({
  username: result(state, 'user.profile.first_name', '') + result(state, 'user.profile.last_name', '')
    || result(state, 'user.profile.display_name', '') ||  result(state, 'user.profile.name', ''),
  productList: result(state, 'billUsage.productList', {}),
  productDetail: result(state, 'billUsage.productDetail', {}),
  billDetail: result(state, 'billUsage.billDetail', {}),
  currentLanguage: result(state, 'user.language', 'th')
});

// TODO REMOVE HARDCODING : Nav params will come from mock data
export const mapDispatchToProps = (dispatch) => ({
  goToScreen: (screenName, params = {}) => dispatch(NavigationActions.navigate({routeName: screenName, params})),
  getProductCurrentUsage: (productType, subscriberId, convBundleName, productId, productTypePayload, subscriptionType) => dispatch(actions.getBillUsageProductDetail({subscriberId, productType, productTypePayload, subscriptionType, productId, convBundleName})),
  getProductBillDetails: (productType, payload) => dispatch(actions.getBillUsageProductBillDetail({productType, ...payload})),
  toggleProductCheck: (productType, payload) => dispatch(actions.toggleBillUsageProductCheckStatus({productType, ...payload})),
  toggleBillDetailCheck: (productType, payload) => (invoiceNos, isChecked, checkedBillSum) => {
    const obj = {productType, invoiceNos, isChecked, checkedBillSum, ...payload};
    dispatch(actions.toggleBillDetailCheckStatus(obj));
  },
  toggleProductCollapse: (productType, subscriberId, convBundleName, productId, productTypePayload, subscriptionType, accountId, selectedTabNumber) =>
    dispatch(actions.toggleBillUsageProductCollapseStatus({productType, subscriberId, convBundleName, productId, productTypePayload, subscriptionType, accountId, selectedTabNumber})),
  setPaymentItems: (items) => dispatch(actions.setPaymentItems(items)),
  onBillDetailsClick: (invoiceNo) => dispatch(actions.getInvoicePdf(invoiceNo))
});

export default connect(mapStateToProps, mapDispatchToProps)(BillUsagePage);
