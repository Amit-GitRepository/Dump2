import BaseProductCard from '../BaseProductCard/BaseProductCard.component';
import BaseProductCollapsibleBar from '../BaseProductCollapsibleBar/BaseProductCollapsibleBar.component';
import isEmpty from 'lodash/isEmpty';
import Proptypes from 'prop-types';
import React from 'react';
import styles from './TVisionProductCard.style.js';
import {BillHistoryList, CurrentUsageCard, ProductCardTitle} from '../../BillUsageShared';
import {CaretTabs} from '../../../../../components/Shared';
import {ICON_MAP} from '../../../../../config/billUsage.config';
import {noop, result} from 'lodash';
import {translate} from '../../../../../language/i18n/helper';
import {View} from 'react-native';

class TVisionProductCard extends BaseProductCard {

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

  navigateToPackagePromoPage = () => {
    this.props.goToScreen('PackagePromoPage', {url: 'https://iservice.truecorp.co.th'});
  }

  navigateToPaymentHistory = () => {
    // TODO navigate to payment history
  }

  render () {
    const {plan, dueBills, amount, productDetail, isOthers, statusCode, isCollapsed, onCollapseToggle, onChecked, isChecked, onTrueVisionNavigatetoPackageDetail, onBillDetailsClick, isCancelled, currentLanguage} = this.props;
    const headerList = [{text: translate('BILLS_USAGE_CURRENT_USAGE')}, {text: translate('BILLS_USAGE_BILL_DETAILS')}];
    const {totalAmount, selectedTabIndex} = this.state;

    const planInfo = result(productDetail, 'PRICE_PLAN_INFO', {});
    const {channelCountHD, channelCountSD, imageURL} = result(productDetail, `TVS_PACKAGES.${currentLanguage}`, {});
    const packageData = [{usage: channelCountHD, type: ICON_MAP.HDCHANNELS.titleText}, {usage: channelCountSD, type: ICON_MAP.CHANNELS.titleText}];
    return (
      <BaseProductCollapsibleBar statusCode={statusCode} checkboxDisabled={!(amount > 0)} type={'VISION'} leftTitleText={plan} leftDetailText={translate('BILLS_USAGE_TRUEVISIONS')} amountText={totalAmount} isCollapsed={isCollapsed} onCollapseToggle={onCollapseToggle} onChecked={onChecked} isChecked={isChecked}>
        <View style={styles.container}>
          { isCancelled || !isOthers && <View style={styles.productTitle}>
            <ProductCardTitle text={planInfo.description} navigate = {onTrueVisionNavigatetoPackageDetail}/>
          </View>}
          {(isCancelled || dueBills && isOthers) ?
            <View style={styles.billDetailContainer}>
              <BillHistoryList onBillDetailsClick={onBillDetailsClick} dueBills={dueBills} onPaymentHistoryClick={this.navigateToPaymentHistory}
                onBillToggle={this.onBillToggle} isCancelled/>
            </View> :
            <CaretTabs onTabPress={this.onTabPress} selectedIndex={selectedTabIndex} headerList={headerList} >
              {selectedTabIndex === 0 && <CurrentUsageCard data={packageData} bannerSrc={imageURL} onBannerClick={this.navigateToPackagePromoPage} textStyle={styles.usageText}/>}
              {selectedTabIndex === 1 && <BillHistoryList onBillDetailsClick={onBillDetailsClick} dueBills={dueBills} onPaymentHistoryClick={this.navigateToPaymentHistory} onBillToggle = {this.onBillToggle}/>}
            </CaretTabs>}
        </View>
      </BaseProductCollapsibleBar>
    );
  }
}

TVisionProductCard.defaultProps = {
  plan: 'Gold',
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
  onBillDetailsClick: noop,
  toggleBillDetailCheck: noop,
  onTrueVisionNavigatetoPackageDetail: noop,
  defaultSelectedTab: 0,
  getCurrentUsage: noop,
  isOthers: false,
  validateOTPStatus: false,
  isCancelled: false,
  currentLanguage: 'th'
};

TVisionProductCard.propTypes = {
  plan: Proptypes.string,
  amount: Proptypes.number,
  dueBills: Proptypes.array,
  productDetail: Proptypes.object,
  goToScreen: Proptypes.func,
  statusCode: Proptypes.string,
  onCollapseToggle: Proptypes.func,
  onBillDetailsClick: Proptypes.func,
  isCollapsed: Proptypes.bool,
  onChecked: Proptypes.func,
  isChecked: Proptypes.bool,
  getDueBills: Proptypes.func,
  toggleBillDetailCheck: Proptypes.func,
  onTrueVisionNavigatetoPackageDetail: Proptypes.func,
  defaultSelectedTab: Proptypes.number,
  getCurrentUsage: Proptypes.func,
  isOthers: Proptypes.bool,
  validateOTPStatus: Proptypes.bool,
  isCancelled: Proptypes.bool,
  currentLanguage: Proptypes.string
};

export default TVisionProductCard;
