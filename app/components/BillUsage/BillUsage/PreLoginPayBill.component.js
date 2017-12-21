import bannerImage from '../../../assets/bill_usage_banner.jpg';
import BillSummaryWrapper from './TopLevelCards/BillSummaryWrapper/BillSummaryWrapper.component';
import noop from 'lodash/noop';
import OTPPrompt from '../OTPPrompt/OTPPrompt.component';
import PrepaidWrapper from './TopLevelCards/PrepaidWrapper/PrepaidWrapper.component';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './PreLoginPayBill.style';
import {availablePackage} from '../mockData';
import {Banner, ISText} from '../../Shared';
import {PRODUCT_TABS} from '../../../config/billUsage.config';
import {ScrollView, View} from 'react-native';
import {some} from 'lodash';
import {translate} from '../../../language/i18n/helper';

class PreLoginPayBill extends Component {
  state = {
    showOTPModal: false,
    navigateToExtraPackage: false
  };
  componentWillReceiveProps = (nextProps) => {
    if (this.props.validateOTPStatus || nextProps.validateOTPStatus) {
      this.setState({showOTPModal: false});
    }
  }
  viewCurrentUsage = ({navigateToExtraPackage}) => {
    this.props.sendOTP(this.props.msisdn);
    this.setState({showOTPModal: true, navigateToExtraPackage: navigateToExtraPackage});
  };
  confirmOTP = (otp) => this.props.validateOTP({msisdn: this.props.msisdn, otp: otp, navigateToExtraPackage: this.state.navigateToExtraPackage});
  onClosePress = () => this.setState({showOTPModal: false});
  render () {
    const {username, goToScreen, productList, toggleBillDetailCheck, productDetail, billDetail, getProductBillDetails, toggleProductCheck, toggleProductCollapse, setPaymentItems, getProductCurrentUsage,
      sendOTPStatus, validateOTPStatus, onLogin, navigateToExtraPackage} = this.props;
    const {tmhPostpaid, conv, tol, tvs, tmhPrepaid} = productList;
    const billSummaryProductList = {tmhPostpaid, conv, tol, tvs};
    const prepaidList = {tmhPrepaid};
    const hasBillSummary = some(billSummaryProductList, (elem) => elem.length > 0);
    const hasPrepaidList = some(prepaidList, (elem) => elem.length > 0);
    const defaultSelectedTab = (validateOTPStatus) ? PRODUCT_TABS.CURRENT_USAGE : PRODUCT_TABS.BILL_SUMMARY;
    return (
      <ScrollView contentContainerStyle={styles.container} accessibilityLabel='Bills&Usage_container'>
        {(sendOTPStatus && this.state.showOTPModal) ? <OTPPrompt msisdn={this.state.newMSISDN} onLogin={onLogin} onConfirm={this.confirmOTP} onClosePress={this.onClosePress} validateOTPStatus={validateOTPStatus}/> : null}
        <Banner source={bannerImage} style={styles.bannerContainer}>
          <ISText style={styles.welcomeText} type='BOLD'>{translate('BILLS_USAGE_WELCOME')}</ISText>
          <ISText style={styles.usernameText} type='BOLD'>{username}</ISText>
        </Banner>
        <View style={styles.productContainer}>
          {
            hasBillSummary ?
              <BillSummaryWrapper productList={billSummaryProductList} billDetail={billDetail} productDetail={productDetail} getProductBillDetails={getProductBillDetails} toggleProductCheck={toggleProductCheck} toggleProductCollapse={toggleProductCollapse}
                goToScreen={goToScreen} toggleBillDetailCheck={toggleBillDetailCheck} setPaymentItems={setPaymentItems} defaultSelectedTab={defaultSelectedTab} getProductCurrentUsage={getProductCurrentUsage} viewCurrentUsage={this.viewCurrentUsage} validateOTPStatus={validateOTPStatus} fromPreLoginScreen={true}
                navigateToExtraPackage={navigateToExtraPackage}/> :
              null
          }
          {
            hasPrepaidList ?
              <PrepaidWrapper productList={prepaidList} containerStyle={hasBillSummary ? styles.separatorPadding : {}} productDetail={productDetail} toggleProductCollapse={toggleProductCollapse} goToScreen={goToScreen} availablePackage={availablePackage} setPaymentItems={setPaymentItems}
                viewCurrentUsage={this.viewCurrentUsage} validateOTPStatus={validateOTPStatus} fromPreLoginScreen={true} navigateToExtraPackage={navigateToExtraPackage}/> :
              null
          }
        </View>
      </ScrollView>
    );
  }
}

PreLoginPayBill.defaultProps = {
  username: '',
  goToScreen: noop,
  productList: {
    tmhPostpaid: [],
    conv: [],
    tol: [],
    tvs: [],
    tmhPrepaid: []
  },
  productDetail: {},
  billDetail: {},
  toggleProductCheck: noop,
  toggleProductCollapse: noop,
  getProductBillDetails: noop,
  toggleBillDetailCheck: noop,
  setPaymentItems: noop,
  getProductCurrentUsage: noop,
  sendOTPStatus: false,
  msisdn: '',
  navigateToExtraPackage: false,
  validateOTPStatus: false
};
PreLoginPayBill.propTypes = {
  username: Proptypes.string,
  goToScreen: Proptypes.func,
  productList: Proptypes.PropTypes.shape({
    tmhPostpaid: Proptypes.array,
    conv: Proptypes.array,
    tol: Proptypes.array,
    tvs: Proptypes.array,
    tmhPrepaid: Proptypes.array
  }),
  productDetail: Proptypes.object,
  billDetail: Proptypes.object,
  toggleProductCheck: Proptypes.func,
  toggleProductCollapse: Proptypes.func,
  getProductBillDetails: Proptypes.func,
  toggleBillDetailCheck: Proptypes.func,
  setPaymentItems: Proptypes.func,
  getProductCurrentUsage: Proptypes.func,
  sendOTPStatus: Proptypes.bool,
  validateOTPStatus: Proptypes.bool,
  sendOTP: Proptypes.func,
  validateOTP: Proptypes.func,
  msisdn: Proptypes.string,
  onLogin: Proptypes.func,
  navigateToExtraPackage: Proptypes.bool
};

export default PreLoginPayBill;
