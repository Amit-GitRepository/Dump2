import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './BillSummaryWrapper.style';
import sumBy from  'lodash/sumBy';
import {AmountText, Button, ISText, WrapperCard} from '../../../../Shared';
import {flatten, isEmpty, map, noop, pick, result, toArray} from 'lodash';
import {phoneNumberFormatter} from '../../../../../utils/common.util';
import {PRODUCT_STATUS, PRODUCT_TABS} from '../../../../../config/billUsage.config';
import {TConvergenceCard, TMPostpaidProductCard, TOnlineProductCard, TVisionProductCard} from '../../ProductCards';
import {translate} from '../../../../../language/i18n/helper';
import {View} from 'react-native';

class BillSummaryWrapper extends Component {
  calculateTotalAmount = () => {
    const {conv, tmhPostpaid, tol, tvs} = this.props.productList;
    const condition = (eachProduct) => eachProduct.isChecked ? eachProduct.checkedBillSum : 0;
    return sumBy(tmhPostpaid, condition) + sumBy(tol, condition) + sumBy(tvs, condition) + sumBy(conv, condition);
  };
  navigateToPayments = () => {
    const {productList, goToScreen, setPaymentItems, billDetail} = this.props;
    const productsToPay = [];
    Object.entries(productList).forEach(([productType, products]) => {
      const payload = products.reduce((aggregate, product) => {
        const {accountId, bundle, isChecked, checkedBillSum} = product;
        if (isChecked && checkedBillSum > 0) {
          const invoiceBcBanId = result(billDetail.conv, `${bundle}[0].invoiceBcBanId`);
          const accountNumber = productType === 'conv' ? result(product, 'products[0].accountId') : accountId;
          aggregate.push({service: productType, amount: checkedBillSum, accountNumber: accountNumber, invoiceBcBanId});
        }
        return aggregate;
      }, []);
      productsToPay.push(...payload);
    });
    setPaymentItems(productsToPay);
    goToScreen('Payment');
  };

  render () {
    const {productList, goToScreen, billDetail, productDetail, onBillDetailsClick, getProductBillDetails, toggleBillDetailCheck, toggleProductCheck, toggleProductCollapse, getProductCurrentUsage, defaultSelectedTab, validateOTPStatus, fromPreLoginScreen, navigateToExtraPackage, currentLanguage} = this.props;
    const {tmhPostpaid, tol, tvs, conv} = productList;

    const trueConvergence = map(conv, (convergenceProduct, index) => {
      const {bundle, products} = convergenceProduct;
      const accountId = convergenceProduct.products.map((product) => product.accountId);
      let trueConvergenceDueBills = pick(billDetail.conv, bundle);
      if (!isEmpty(trueConvergenceDueBills)) {
        trueConvergenceDueBills = flatten(toArray(trueConvergenceDueBills));
      } else {
        trueConvergenceDueBills = null;
      }
      const trueConvergenceProductDetail =  result(productDetail, 'conv', {});
      const onTrueConvergenceCheckToggle = () => toggleProductCheck('conv', {bundle});
      const onTrueConvergenceCollapseToggle = (productType, subscriberId, productId, productTypeAsInPayload, subscriptionType, accountId) => () => toggleProductCollapse(productType, subscriberId, convergenceProduct.bundle, productId, productTypeAsInPayload, subscriptionType, accountId, defaultSelectedTab);
      const onTrueConvergenceGetDueBills = () => getProductBillDetails('conv', {accountId, bundle});
      const isCollapsed = !((isEmpty(tmhPostpaid) && isEmpty(tol) && isEmpty(tvs) && !isEmpty(conv))); // expand card if conv is first card with data
      return (
        <TConvergenceCard amount={Number(convergenceProduct.balance)} status={convergenceProduct.state} plan={convergenceProduct.bundle} key={index} products={products} goToScreen={goToScreen} dueBills={trueConvergenceDueBills} productDetail={trueConvergenceProductDetail} onCollapseToggle={onTrueConvergenceCollapseToggle} onChecked={onTrueConvergenceCheckToggle} isChecked={convergenceProduct.isChecked} getDueBills={onTrueConvergenceGetDueBills} toggleBillDetailCheck ={toggleBillDetailCheck('conv', {bundle})} onBillDetailsClick={onBillDetailsClick} defaultSelectedTab={defaultSelectedTab} isCollapsed={isCollapsed} currentLanguage={currentLanguage}/>
      );
    });

    const trueMoveH = map(tmhPostpaid, (postpaidInfo, index) => {
      const {accountId, subscriberId, productId, productType, subscriptionType, statusCode} = postpaidInfo;
      const phoneNumber = phoneNumberFormatter(productId);
      const isCancelled = statusCode === PRODUCT_STATUS.CANCEL;
      const trueMoveHProductDetail =  result(productDetail, `tmhPostpaid.${subscriberId}`, {});
      const trueMoveHProductDueBills = result(billDetail, `tmhPostpaid.${accountId}`, null);
      const onTrueMoveHCheckToggle = () => toggleProductCheck('tmhPostpaid', {subscriberId});
      const onTrueMoveHGetDueBills = () => getProductBillDetails('tmhPostpaid', {accountId});
      const selectedTab = (isCancelled) ? PRODUCT_TABS.BILL_SUMMARY : defaultSelectedTab;
      const onTrueMoveHNavigatetoExtraPackage = () => {
        if (fromPreLoginScreen && !validateOTPStatus && isEmpty(trueMoveHProductDetail)) {
          this.props.viewCurrentUsage({navigateToExtraPackage: true});
        } else {
          isEmpty(trueMoveHProductDetail) ? onTrueMoveHCurrentUsage() : noop;
          goToScreen('TMPackageDetailsExtra', {title: phoneNumber, productType: 'tmhPostpaid', subscriberId}); // TODO: Move navigation to saga
        }
      };
      const onTrueMoveHCurrentUsage = () => {
        (fromPreLoginScreen && !validateOTPStatus) ? this.props.viewCurrentUsage({navigateToExtraPackage: false}) :
          getProductCurrentUsage('tmhPostpaid', subscriberId, null, productId, productType, subscriptionType);
      };
      const onTrueMoveHCollapseToggle = () => toggleProductCollapse('tmhPostpaid', subscriberId, null, productId, productType, subscriptionType, accountId, selectedTab);
      return (
        <TMPostpaidProductCard phone={phoneNumber} amount={Number(postpaidInfo.balance)} statusCode={postpaidInfo.statusCode} key={index} goToScreen={goToScreen} dueBills={trueMoveHProductDueBills} productDetail={trueMoveHProductDetail} isCollapsed={postpaidInfo.isCollapsed} onCollapseToggle={onTrueMoveHCollapseToggle} onChecked={onTrueMoveHCheckToggle} isChecked={postpaidInfo.isChecked} getDueBills={onTrueMoveHGetDueBills} toggleBillDetailCheck ={toggleBillDetailCheck('tmhPostpaid', {accountId})} onTrueMoveHNavigatetoExtraPackage={onTrueMoveHNavigatetoExtraPackage} onBillDetailsClick={onBillDetailsClick} defaultSelectedTab={selectedTab} getCurrentUsage={onTrueMoveHCurrentUsage} validateOTPStatus={validateOTPStatus} navigateToExtraPackage={navigateToExtraPackage} isCancelled={isCancelled}/>
      );
    });

    const trueOnline = map(tol, (trueOnlineInfo, index) => {
      const {accountId, subscriberId, productId, productType, subscriptionType, statusCode} = trueOnlineInfo;
      const isCancelled = statusCode === PRODUCT_STATUS.CANCEL;
      const trueOnlineProductDetail =  result(productDetail, `tol.${subscriberId}`, {});
      const trueOnlineProductDueBills = result(billDetail, `tol.${accountId}`, null);
      const selectedTab = (isCancelled) ? PRODUCT_TABS.BILL_SUMMARY : defaultSelectedTab;
      const onTrueOnlineCheckToggle = () => toggleProductCheck('tol', {subscriberId});
      const onTrueOnlineCollapseToggle = () => toggleProductCollapse('tol', subscriberId, null, productId, productType, subscriptionType, accountId, selectedTab);
      const onTrueOnlineGetDueBills = () => getProductBillDetails('tol', {accountId});
      const onTrueOnlineNavigatetoExtraPackage = () => {
        if (fromPreLoginScreen && !validateOTPStatus && isEmpty(trueOnlineProductDetail)) {
          this.props.viewCurrentUsage({navigateToExtraPackage: true});
        } else {
          fromPreLoginScreen ? onTrueOnlineCurrentUsage() : noop;
          goToScreen('TOLPackageDetail', {productId: productId, productType: 'tol', subscriberId});
        }
      };
      const onTrueOnlineCurrentUsage = () => {
        (fromPreLoginScreen && !validateOTPStatus) ? this.props.viewCurrentUsage({navigateToExtraPackage: false}) :
          getProductCurrentUsage('tol', subscriberId, null, productId, productType, subscriptionType);
      };
      return (
        <TOnlineProductCard key={index} plan={trueOnlineInfo.productId} productDetail={trueOnlineProductDetail} dueBills={trueOnlineProductDueBills} amount={Number(trueOnlineInfo.balance)} statusCode={trueOnlineInfo.statusCode} goToScreen={goToScreen}
          isCollapsed={trueOnlineInfo.isCollapsed} onCollapseToggle={onTrueOnlineCollapseToggle} onChecked={onTrueOnlineCheckToggle} isChecked={trueOnlineInfo.isChecked} getDueBills={onTrueOnlineGetDueBills} onBillDetailsClick={onBillDetailsClick}
          toggleBillDetailCheck ={toggleBillDetailCheck('tol', {accountId})} defaultSelectedTab={selectedTab} getCurrentUsage={onTrueOnlineCurrentUsage} onTrueOnlineNavigatetoExtraPackage={onTrueOnlineNavigatetoExtraPackage}
          isCancelled={isCancelled} currentLanguage={currentLanguage}/>
      );
    });

    const trueVision = map(tvs, (trueVisionInfo, index) => {
      const {accountId, subscriberId, productId, productType, subscriptionType, statusCode} = trueVisionInfo;
      const isCancelled = statusCode === PRODUCT_STATUS.CANCEL;
      const trueVisionProductDetail =  result(productDetail, `tvs.${subscriberId}`, {});
      const trueVisionProductDueBills = result(billDetail, `tvs.${accountId}`, null);
      const selectedTab = (isCancelled) ? PRODUCT_TABS.BILL_SUMMARY : defaultSelectedTab;
      const onTrueVisionCheckToggle = () => toggleProductCheck('tvs', {subscriberId});
      const onTrueVisionCollapseToggle = () => toggleProductCollapse('tvs', subscriberId, null, productId, productType, subscriptionType, accountId, selectedTab);
      const onTrueVisionGetDueBills = () => getProductBillDetails('tvs', {accountId});
      const onTrueVisionNavigatetoPackageDetail = () => {
        if (fromPreLoginScreen && !validateOTPStatus && isEmpty(trueVisionProductDetail)) {
          this.props.viewCurrentUsage({navigateToExtraPackage: true});
        } else {
          fromPreLoginScreen ? onTrueVisionCurrentUsage() : noop;
          goToScreen('TVPackageDetail', {productId: productId, productType: 'tvs', subscriberId});
        }
      };
      const onTrueVisionCurrentUsage = () => {
        (fromPreLoginScreen && !validateOTPStatus) ? this.props.viewCurrentUsage({navigateToExtraPackage: false}) :
          getProductCurrentUsage('tvs', subscriberId, null, productId, productType, subscriptionType);
      };
      return (
        <TVisionProductCard key={index} plan={trueVisionInfo.productId} productDetail={trueVisionProductDetail} dueBills={trueVisionProductDueBills} amount={Number(trueVisionInfo.balance)} statusCode={trueVisionInfo.statusCode} goToScreen={goToScreen} isCollapsed={trueVisionInfo.isCollapsed} onCollapseToggle={onTrueVisionCollapseToggle} onChecked={onTrueVisionCheckToggle} isChecked={trueVisionInfo.isChecked} getDueBills={onTrueVisionGetDueBills} toggleBillDetailCheck ={toggleBillDetailCheck('tvs', {accountId})} onBillDetailsClick={onBillDetailsClick} defaultSelectedTab={defaultSelectedTab} getCurrentUsage={onTrueVisionCurrentUsage} onTrueVisionNavigatetoPackageDetail={onTrueVisionNavigatetoPackageDetail}
          isCancelled={isCancelled} currentLanguage={currentLanguage}/>
      );
    });

    const totalAmount = this.calculateTotalAmount();
    return (
      <WrapperCard header={translate('BILLS_USAGE_BILLING_SUMMARY')} style={styles.container} contentContainerStyles={styles.contentContainer}>
        <View style={styles.totalBillSection}>
          <View>
            <ISText style={styles.postpaidTitleText}>{translate('BILLS_USAGE_TOTAL')}</ISText>
            <AmountText style={styles.totalAmount} value={totalAmount} isTotalText/>
          </View>
          <Button text={translate('BILLS_USAGE_PAY')} disabled={!totalAmount} textStyle={styles.buttonText} style={styles.buttonStyle} onPress={this.navigateToPayments}/>
        </View>
        {trueMoveH}
        {trueOnline}
        {trueVision}
        {trueConvergence}
      </WrapperCard>);
  }
}

BillSummaryWrapper.defaultProps = {
  goToScreen: noop,
  productList: {},
  productDetail: {},
  billDetail: {},
  toggleProductCheck: noop,
  toggleProductCollapse: noop,
  getProductBillDetails: noop,
  toggleBillDetailCheck: noop,
  onBillDetailsClick: noop,
  setPaymentItems: noop,
  getProductCurrentUsage: noop,
  defaultSelectedTab: PRODUCT_TABS.CURRENT_USAGE,
  validateOTPStatus: false,
  fromPreLoginScreen: false,
  navigateToExtraPackage: false,
  currentLanguage: 'th'
};

BillSummaryWrapper.propTypes = {
  goToScreen: Proptypes.func,
  productList: Proptypes.object,
  productDetail: Proptypes.object,
  billDetail: Proptypes.object,
  toggleProductCheck: Proptypes.func,
  toggleProductCollapse: Proptypes.func,
  getProductBillDetails: Proptypes.func,
  toggleBillDetailCheck: Proptypes.func,
  onBillDetailsClick: Proptypes.func,
  setPaymentItems: Proptypes.func,
  getProductCurrentUsage: Proptypes.func,
  defaultSelectedTab: Proptypes.number,
  viewCurrentUsage: Proptypes.func,
  validateOTPStatus: Proptypes.bool,
  fromPreLoginScreen: Proptypes.bool,
  navigateToExtraPackage: Proptypes.bool,
  currentLanguage: Proptypes.string
};

export default BillSummaryWrapper;
