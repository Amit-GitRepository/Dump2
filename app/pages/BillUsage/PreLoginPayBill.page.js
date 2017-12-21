import ComponentWithTab from '../../components/ComponentWithTab/ComponentWithTab.component';
import PreLoginPayBill from '../../components/BillUsage/BillUsage/PreLoginPayBill.component';
import Proptypes from 'prop-types';
import React from 'react';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import * as actions from '../../redux/actions/index.actions';

class PreLoginPayBillPage extends ComponentWithTab {
  componentDidMount () {
    this.props.getProduct();
  }

  componentWillUnmount () {
    this.props.resetPrepay();
  }

  renderWithTab () {
    const {productList, toggleBillDetailCheck, productDetail, billDetail, getProductBillDetails, goToScreen, toggleProductCheck, toggleProductCollapse, setPaymentItems, getProductCurrentUsage, sendOTP, validateOTP, sendOTPStatus, validateOTPStatus, msisdn, loginRequest, navigateToExtraPackage, navigation} = this.props;
    const serviceNo = result(navigation, 'state.params.serviceNo', '');
    return (
      <PreLoginPayBill productList={productList} productDetail={productDetail} billDetail={billDetail} username={serviceNo} goToScreen={goToScreen}
        toggleProductCheck={toggleProductCheck} toggleProductCollapse={toggleProductCollapse} getProductBillDetails={getProductBillDetails} toggleBillDetailCheck = {toggleBillDetailCheck} setPaymentItems={setPaymentItems} getProductCurrentUsage={getProductCurrentUsage}
        sendOTP={sendOTP} validateOTP={validateOTP} sendOTPStatus={sendOTPStatus} validateOTPStatus={validateOTPStatus} msisdn={msisdn} onLogin={loginRequest} navigateToExtraPackage={navigateToExtraPackage}/>
    );
  }
}

PreLoginPayBillPage.propTypes = {
  goToScreen: Proptypes.func,
  productList: Proptypes.object,
  productDetail: Proptypes.object,
  billDetail: Proptypes.object,
  getProduct: Proptypes.func,
  toggleProductCheck: Proptypes.func,
  toggleProductCollapse: Proptypes.func,
  toggleBillDetailCheck: Proptypes.func,
  setPaymentItems: Proptypes.func,
  getProductCurrentUsage: Proptypes.func,
  sendOTPStatus: Proptypes.bool,
  validateOTPStatus: Proptypes.bool,
  sendOTP: Proptypes.func,
  validateOTP: Proptypes.func,
  loginRequest: Proptypes.func,
  resetPrepay: Proptypes.func,
  navigateToExtraPackage: Proptypes.bool,
  navigation: Proptypes.object
};

export const mapStateToProps = (state) => ({
  productList: result(state, 'billUsage.productList', {}),
  productDetail: result(state, 'billUsage.productDetail', {}),
  billDetail: result(state, 'billUsage.billDetail', {}),
  msisdn: String(result(state, 'preLoginPay.msisdn', '')),
  sendOTPStatus: result(state, 'preLoginPay.sendOTPStatus', false),
  validateOTPStatus: result(state, 'preLoginPay.validateOTPStatus', false),
  navigateToExtraPackage: result(state, 'preLoginPay.navigateToExtraPackage', false)
});

// TODO REMOVE HARDCODING : Nav params will come from mock data
export const mapDispatchToProps = (dispatch) => ({
  goToScreen: (screenName, params = {}) => dispatch(NavigationActions.navigate({routeName: screenName, params})),
  getProduct: () => dispatch(actions.getBillUsageProduct()),
  getProductBillDetails: (productType, payload) => dispatch(actions.getBillUsageProductBillDetail({productType, ...payload})),
  toggleProductCheck: (productType, payload) => dispatch(actions.toggleBillUsageProductCheckStatus({productType, ...payload})),
  toggleBillDetailCheck: (productType, payload) => (invoiceNos, isChecked, checkedBillSum) => {
    const obj = {productType, invoiceNos, isChecked, checkedBillSum, ...payload};
    dispatch(actions.toggleBillDetailCheckStatus(obj));
  },
  toggleProductCollapse: (productType, subscriberId, convBundleName, productId, productTypePayload, subscriptionType, accountId, selectedTabNumber) => dispatch(actions.toggleBillUsageProductCollapseStatus({productType, subscriberId, convBundleName, productId, productTypePayload, subscriptionType, accountId, selectedTabNumber})),
  setPaymentItems: (items) => dispatch(actions.setPaymentItems(items)),
  getProductCurrentUsage: (productType, subscriberId, convBundleName, productId, productTypePayload, subscriptionType) => dispatch(actions.getBillUsageProductDetail({subscriberId, productType, productTypePayload, subscriptionType, productId, convBundleName})),
  sendOTP: (msisdn) => dispatch(actions.sendOTP(msisdn)),
  validateOTP: (msisdn, otp) => dispatch(actions.validateOTP(msisdn, otp)),
  loginRequest: () => dispatch(actions.loginRequest(NavigationActions.navigate({routeName: 'BillUsage'}))),
  resetPrepay: () => dispatch(actions.resetPrepay())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreLoginPayBillPage);
