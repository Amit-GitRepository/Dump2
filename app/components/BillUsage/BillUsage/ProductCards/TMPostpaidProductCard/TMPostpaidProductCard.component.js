import BaseProductCard from '../BaseProductCard/BaseProductCard.component';
import BaseProductCollapsibleBar from '../BaseProductCollapsibleBar/BaseProductCollapsibleBar.component';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import Proptypes from 'prop-types';
import React from 'react';
import result from 'lodash/result';
import styles from './TMPostpaidProductCard.style.js';
import {BillHistoryList, CurrentUsageTM, ProductCardTitle} from '../../BillUsageShared';
import {CaretTabs} from '../../../../../components/Shared';
import {shadowActiveStyle} from '../../../../../themes/application.styles';
import {translate} from '../../../../../language/i18n/helper';
import {View} from 'react-native';

class TMPostpaidProductCard extends BaseProductCard {
  state = {
    selectedTabIndex: this.props.defaultSelectedTab,
    totalAmount: this.props.amount
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.validateOTPStatus && isEmpty(this.props.productDetail)) {
      if (nextProps.navigateToExtraPackage) {
        this.props.onTrueMoveHNavigatetoExtraPackage();
      } else {
        this.props.getCurrentUsage();
      }
    }
  }
  onTabPress = (selectedTabIndex) => {
    if (selectedTabIndex === 1 && !this.props.dueBills) {
      this.props.getDueBills();
    }
    if (selectedTabIndex === 0 && isEmpty(this.props.productDetail)) {
      this.props.getCurrentUsage();
    }
    this.setState({selectedTabIndex});
  }

  navigateToBuyExtraPackage = () => {
    // TODO navigate to buy Buy Extra Package screen when implemented
  }
  navigateToPaymentHistory = () => {
    // TODO navigate to payment history
  }
  render () {
    const {phone, statusCode, amount, productDetail, dueBills, isOthers, isCollapsed, onCollapseToggle, onChecked, isChecked, onTrueMoveHNavigatetoExtraPackage, onBillDetailsClick, isCancelled} = this.props;
    const {totalAmount, selectedTabIndex} = this.state;
    const headerList = [{text: translate('BILLS_USAGE_CURRENT_USAGE')}, {text: translate('BILLS_USAGE_BILL_DETAILS')}];
    const planInfo = result(productDetail, 'PRICE_PLAN_INFO', {});
    const noOfExtraPackages = result(productDetail, 'BUNDLE_USAGE.EXTRA_PACKAGE', []).length;
    const subtitle = noOfExtraPackages > 0  ? `(${noOfExtraPackages} Extra Packages)` : null;
    return (
      <BaseProductCollapsibleBar checkboxDisabled={!(amount > 0)} statusCode={statusCode} type={'POSTPAID'} leftTitleText={phone} leftDetailText={translate('BILLS_USAGE_TRUEMOVE')} amountText={totalAmount} isCollapsed={isCollapsed} onCollapseToggle={onCollapseToggle} onChecked={onChecked} isChecked={isChecked}>
        <View style={styles.container}>
          {isCancelled || !isOthers && <View style={styles.productTitle}>
            <ProductCardTitle text={planInfo.description} navigate={onTrueMoveHNavigatetoExtraPackage} subtext={subtitle}/>
          </View>}
          {(isCancelled || dueBills && isOthers) ?
            <View style={[styles.billDetailContainer, shadowActiveStyle]} elevation={4}>
              <BillHistoryList onBillDetailsClick={onBillDetailsClick} dueBills={dueBills} onPaymentHistoryClick={this.navigateToPaymentHistory}
                onBillToggle={this.onBillToggle} isCancelled/>
            </View> :
            <CaretTabs onTabPress={this.onTabPress} selectedIndex={selectedTabIndex} headerList={headerList}>
              { (selectedTabIndex === 0) ?
                <CurrentUsageTM usageData={productDetail.BUNDLE_USAGE} navigateToBuyExtraPackage={this.navigateToBuyExtraPackage} sharedNumbers={productDetail.SHARED_PLAN_INFO} multiSimNumbers={productDetail.MULTI_SIM_INFO}/>
                : null
              }

              {
                (selectedTabIndex === 1) ?
                  <BillHistoryList onBillDetailsClick={onBillDetailsClick} dueBills={dueBills} onPaymentHistoryClick={this.navigateToPaymentHistory}
                    onBillToggle={this.onBillToggle}/>
                  : null
              }

            </CaretTabs>
          }
        </View>
      </BaseProductCollapsibleBar>
    );
  }
}

TMPostpaidProductCard.defaultProps = {
  phone: '',
  amount: 0,
  goToScreen: noop,
  statusCode: 'ACTIVE',
  productDetail: {},
  dueBills: null,
  isCollapsed: true,
  onCollapseToggle: noop,
  onChecked: noop,
  isChecked: false,
  getDueBills: noop,
  toggleBillDetailCheck: noop,
  onBillDetailsClick: noop,
  onTrueMoveHNavigatetoExtraPackage: noop,
  defaultSelectedTab: 0,
  getCurrentUsage: noop,
  isOthers: false,
  validateOTPStatus: false,
  isCancelled: false
};

TMPostpaidProductCard.propTypes = {
  phone: Proptypes.string,
  amount: Proptypes.number,
  goToScreen: Proptypes.func,
  dueBills: Proptypes.array,
  productDetail: Proptypes.object,
  statusCode: Proptypes.string,
  onCollapseToggle: Proptypes.func,
  isCollapsed: Proptypes.bool,
  onChecked: Proptypes.func,
  isChecked: Proptypes.bool,
  getDueBills: Proptypes.func,
  toggleBillDetailCheck: Proptypes.func,
  onBillDetailsClick: Proptypes.func,
  onTrueMoveHNavigatetoExtraPackage: Proptypes.func,
  defaultSelectedTab: Proptypes.number,
  getCurrentUsage: Proptypes.func,
  isOthers: Proptypes.bool,
  validateOTPStatus: Proptypes.bool,
  isCancelled: Proptypes.bool
};

export default TMPostpaidProductCard;
