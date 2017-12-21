import BaseProductCollapsibleBar from '../BaseProductCollapsibleBar/BaseProductCollapsibleBar.component';
import CurrentUsageTM from '../../../BillUsage/BillUsageShared/CurrentUsageTM/CurrentUsageTM.component';
import isEmpty from 'lodash/isEmpty';
import moment from '../../../../../utils/moment.util';
import noop from 'lodash/noop';
import ProductCardTitle from '../../BillUsageShared/ProductCardTitle/ProductCardTitle.component';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './TMPrepaidProductCard.style';
import {Button, ISText} from '../../../../Shared';
import {PREPAID_CONFIG, PRODUCT_STATUS} from '../../../../../config/billUsage.config';
import {translate} from '../../../../../language/i18n/helper';
import {View} from 'react-native';

class TMPrepaidProductCard extends Component {
  navigateToBillDetail = (bill) => () => {
    this.props.goToScreen('TMoveBillDetail', bill);
  }
  componentWillReceiveProps = () => {
    if (this.props.validateOTPStatus && isEmpty(this.props.productDetail)) {
      this.props.onCollapseToggle();
    }
  }
  render () {
    const {phone, amount, expiryDate, onRadioSelect, isSelected, isCollapsed, onCollapseToggle, productDetail, status, onTrueMoveHNavigatetoExtraPackage} = this.props;
    const currentDate = moment();
    const daysDiff = expiryDate ? moment(expiryDate).diff(currentDate, 'days') : 0;
    const remainingDays = daysDiff > 0 ? daysDiff : 0;
    const noOfExtraPackages = result(productDetail, 'BUNDLE_USAGE.EXTRA_PACKAGE', []).length;
    const noOfMainPackages = result(productDetail, 'BUNDLE_USAGE.MAIN_PACKAGE', []).length;
    const simExpiryDate = expiryDate ? new moment(expiryDate).format('DD MMM YYYY') : '';
    const planInfo = result(productDetail, 'PRICE_PLAN_INFO', {});
    const subTextForExtraPackageInfo = noOfExtraPackages > 0  ? `(${noOfExtraPackages} Extra Packages)` : '';
    const subTextForActiveUntilInfo = !simExpiryDate ? subTextForExtraPackageInfo : `${translate('BILLS_USAGE_ACTIVE_UNTIL')} ${simExpiryDate} ${subTextForExtraPackageInfo}`;
    const subText = status === PRODUCT_STATUS.SUSPEND ? subTextForExtraPackageInfo : subTextForActiveUntilInfo;
    const leftTitleTextStyle = remainingDays > PREPAID_CONFIG.MINIMUM_DAYS_ALERT ? {} : styles.leftTitleTextStyle;
    return (
      <BaseProductCollapsibleBar type={'PREPAID'} status={status} leftTitleText={phone}
        leftDetailText={expiryDate ? `${translate('BILLS_USAGE_REMAINING_DAYS', {count: remainingDays, days: remainingDays})}` : ''}
        rightTitleText={translate('BILLS_USAGE_BALANCE')} amountText={amount}
        onChecked={onRadioSelect} isCollapsed={isCollapsed} onCollapseToggle={onCollapseToggle} isChecked={isSelected} value={phone}
        leftTitleTextStyle={leftTitleTextStyle}>
        <View style={styles.container}>
          <View style={styles.productTitle}>
            <ProductCardTitle text={planInfo.description} subtext={subText} navigate = {onTrueMoveHNavigatetoExtraPackage} isPrepaid/>
          </View>
          <View elevation={2} style={styles.subContainer}>
            {status === PRODUCT_STATUS.SUSPEND ? <View>
              <ISText style={styles.title} type='BOLD'>{translate('BILLS_USAGE_PREPAID_SUSPEND_MESSAGE') + ' ' + simExpiryDate}</ISText>
              <Button text={translate('BILLS_USAGE_TOP_UP')} style={styles.buttonStyle}/>
              <View style={styles.horizontalLine}/>
            </View> : null}
            {noOfExtraPackages > 0 || noOfMainPackages > 0 ? <View style={styles.titleContainer}><ISText style={styles.title} type='BOLD'>{translate('BILLS_USAGE_EXTRA_PACKAGE_USAGE')}</ISText></View> : null}
            <CurrentUsageTM isPrepaid={true} usageData={productDetail.BUNDLE_USAGE} navigateToBuyExtraPackage={this.navigateToBuyExtraPackage} goToBillDetail={this.navigateToBillDetail(productDetail.invoice_id)}/>
          </View>
        </View>
      </BaseProductCollapsibleBar>
    );
  }
}

TMPrepaidProductCard.defaultProps = {
  phone: '',
  expiryDate: '',
  amount: 0,
  goToScreen: noop,
  onRadioSelect: noop,
  isSelected: false,
  status: '',
  onCollapseToggle: noop,
  isCollapsed: true,
  productDetail: {},
  onTrueMoveHNavigatetoExtraPackage: noop,
  validateOTPStatus: false
};

TMPrepaidProductCard.propTypes = {
  phone: Proptypes.string,
  expiryDate: Proptypes.string,
  amount: Proptypes.number,
  goToScreen: Proptypes.func,
  productDetail: Proptypes.object,
  onRadioSelect: Proptypes.func,
  isSelected: Proptypes.bool,
  status: Proptypes.string,
  onCollapseToggle: Proptypes.func,
  isCollapsed: Proptypes.bool,
  onTrueMoveHNavigatetoExtraPackage: Proptypes.func,
  validateOTPStatus: Proptypes.bool
};

export default TMPrepaidProductCard;
