import BaseProductCard from '../BaseProductCard/BaseProductCard.component';
import BaseProductCollapsibleBar from '../BaseProductCollapsibleBar/BaseProductCollapsibleBar.component';
import isEmpty from 'lodash/isEmpty';
import Proptypes from 'prop-types';
import React from 'react';
import styles from './TOnlineProductCard.style.js';
import {BillHistoryList, CurrentUsageCard, ProductCardTitle} from '../../BillUsageShared';
import {CaretTabs} from '../../../../../components/Shared';
import {noop, result} from 'lodash';
import {TOL_SPEED_TYPES} from '../../../../../config/billUsage.config';
import {translate} from '../../../../../language/i18n/helper';
import {View} from 'react-native';

class TOnlineProductCard extends BaseProductCard {
  state = {
    selectedTabIndex: this.props.defaultSelectedTab,
    totalAmount: this.props.amount
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

  navigateToPaymentHistory = () => {
    // TODO navigate to payment history
  }

  navigateToPackagePromoPage = () => {
    this.props.goToScreen('PackagePromoPage', {url: 'https://iservice.truecorp.co.th'});
  }

  render () {
    const {plan, dueBills, amount, productDetail, isOthers, statusCode, isCollapsed, onCollapseToggle, onChecked, isChecked, onTrueOnlineNavigatetoExtraPackage, onBillDetailsClick, isCancelled, currentLanguage} = this.props;
    const {totalAmount, selectedTabIndex} = this.state;
    const headerList = [{text: translate('BILLS_USAGE_CURRENT_USAGE')}, {text: translate('BILLS_USAGE_BILL_DETAILS')}];
    const planInfo = result(productDetail, 'PRICE_PLAN_INFO', {});
    const {downloadSpeed, uploadSpeed, unit, imageURL} = result(productDetail, `TOL_SPEEDS.${currentLanguage}`, {});
    const packageData = [{usage: downloadSpeed, unit: unit, type: TOL_SPEED_TYPES.DOWNLOAD}, {usage: uploadSpeed, unit: unit, type: TOL_SPEED_TYPES.UPLOAD}];
    return (
      <BaseProductCollapsibleBar statusCode={statusCode} checkboxDisabled={!(amount > 0)} type={'ONLINE'} leftTitleText={plan} leftDetailText={translate('BILLS_USAGE_TRUEONLINE')} amountText={totalAmount} isCollapsed={isCollapsed} onCollapseToggle={onCollapseToggle} onChecked={onChecked} isChecked={isChecked}>
        <View style={styles.container}>
          {isCancelled || !isOthers &&
          <View style={styles.productTitle}>
            <ProductCardTitle text={planInfo.description} navigate={onTrueOnlineNavigatetoExtraPackage}/>
          </View>
          }

          {(isCancelled || dueBills && isOthers) ?
            <View style={styles.billDetailContainer}>
              <BillHistoryList onBillDetailsClick={onBillDetailsClick} dueBills={dueBills} onPaymentHistoryClick={this.navigateToPaymentHistory}
                onBillToggle={this.onBillToggle} isCancelled/>
            </View> :
            <CaretTabs onTabPress={this.onTabPress} selectedIndex={selectedTabIndex} headerList={headerList} activeTabStyle={styles.activeTabStyle} bodyStyle={styles.tabContainer}>
              {selectedTabIndex === 0 && <CurrentUsageCard data={packageData} bannerSrc={imageURL} onBannerClick={this.navigateToPackagePromoPage} textStyle={styles.usageText}/>}
              {selectedTabIndex === 1 && <BillHistoryList onBillDetailsClick={onBillDetailsClick} dueBills={dueBills} onPaymentHistoryClick={this.navigateToPaymentHistory} onBillToggle={this.onBillToggle}/> }
            </CaretTabs>}
        </View>
      </BaseProductCollapsibleBar>
    );
  }
}

TOnlineProductCard.defaultProps = {
  plan: '',
  amount: 0,
  dueBills: [],
  productDetail: {},
  goToScreen: noop,
  statusCode: 'ACTIVE',
  isCollapsed: true,
  onCollapseToggle: noop,
  onChecked: noop,
  isChecked: false,
  getDueBills: noop,
  toggleBillDetailCheck: noop,
  onBillDetailsClick: noop,
  onTrueOnlineNavigatetoExtraPackage: noop,
  defaultSelectedTab: 0,
  getCurrentUsage: noop,
  isCancelled: false,
  validateOTPStatus: false,
  currentLanguage: 'th'
};

TOnlineProductCard.propTypes = {
  plan: Proptypes.string,
  amount: Proptypes.number,
  dueBills: Proptypes.array,
  productDetail: Proptypes.object,
  goToScreen: Proptypes.func,
  statusCode: Proptypes.string,
  onCollapseToggle: Proptypes.func,
  isCollapsed: Proptypes.bool,
  onChecked: Proptypes.func,
  isChecked: Proptypes.bool,
  getDueBills: Proptypes.func,
  toggleBillDetailCheck: Proptypes.func,
  onBillDetailsClick: Proptypes.func,
  onTrueOnlineNavigatetoExtraPackage: Proptypes.func,
  defaultSelectedTab: Proptypes.number,
  getCurrentUsage: Proptypes.func,
  isCancelled: Proptypes.bool,
  validateOTPStatus: Proptypes.bool,
  currentLanguage: Proptypes.string
};

export default TOnlineProductCard;
