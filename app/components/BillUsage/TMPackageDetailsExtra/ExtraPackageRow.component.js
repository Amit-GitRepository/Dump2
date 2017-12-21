import moment from '../../../utils/moment.util';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './ExtraPackageRow.style';
import {bytesToSize, precisionFormatter} from '../../../utils/common.util';
import {colors} from '../../../themes/constants.styles';
import {ICON_MAP, PROGRESS_BAR, QUOTA_TYPE, QUOTA_VALUE} from '../../../config/billUsage.config';
import {ISText, ProgressBar} from '../../Shared';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class ExtraPackageRow extends Component {
  render () {
    const {packageRowItem, index, packageType, length, hideSeparator, isPrepaid} = this.props;
    const {quotaType, packageCode, endDate, packageName, subQuotaType} = packageRowItem;

    let remainingQuota = packageRowItem.remainingQuota;
    let remainingQuotaUnit = packageRowItem.remainingQuotaUnit;
    let initialQuotaUnit = packageRowItem.initialQuotaUnit;
    let initialQuota = packageRowItem.initialQuota;
    if (packageRowItem.fup) { // When FUP present: display FUP values
      remainingQuota = packageRowItem.fup.remainingQuota;
      remainingQuotaUnit = packageRowItem.fup.remainingQuotaUnit;
      initialQuotaUnit = packageRowItem.fup.initialQuotaUnit;
      initialQuota = packageRowItem.fup.initialQuota;
    }

    const packageDisplayName =  packageName ? packageName : packageCode;
    const valueType = (isPrepaid) ? translate('BILLS_USAGE_REMAINING') : translate('BILLS_USAGE_USED');
    const title = (subQuotaType === QUOTA_TYPE.SOCIAL) ? result(ICON_MAP[subQuotaType], 'titleText', '') : result(ICON_MAP[quotaType], 'titleText', '');

    const isUnlimited = initialQuota === QUOTA_VALUE.UNLIMITED || remainingQuota === QUOTA_VALUE.UNLIMITED;
    const initialValueUnit = quotaType === QUOTA_TYPE.VOICE ? translate('BILLS_USAGE_MIN') : initialQuotaUnit;
    const isData = quotaType === QUOTA_TYPE.DATA || quotaType === QUOTA_TYPE.WIFI;

    let value = remainingQuota;
    let unit = quotaType === QUOTA_TYPE.VOICE ? translate('BILLS_USAGE_MIN') : remainingQuotaUnit;
    if (!isPrepaid && !isUnlimited && initialQuota) {
      if (isData) {
        const initialQuotaInBytes = bytesToSize(initialQuota, initialQuotaUnit, 'Bytes');
        const remainingQuotaInBytes = bytesToSize(remainingQuota, remainingQuotaUnit, 'Bytes');
        const usedQuotaInBytes = initialQuotaInBytes.value - remainingQuotaInBytes.value;
        const usedQuota = bytesToSize(usedQuotaInBytes, 'Bytes');
        value = usedQuota.value;
        unit = usedQuota.unit;
      } else {
        value = initialQuota - remainingQuota;
      }
    }

    const percentageValue = (isUnlimited || !initialQuota) ? PROGRESS_BAR.DEFAULT_FILL : (value * 100) / initialQuota;
    const initialValue = precisionFormatter(initialQuota, isData);// showPrecision if data values
    value = precisionFormatter(value, isData);

    return (
      <View style={[styles.container, (length - 1 === index && !hideSeparator) ? {} : styles.separator]}>
        <View style={styles.titleContainer}>
          <ISText type='BOLD' style={styles.itemTitle}>{title ? translate(title) : quotaType}
            <ISText type='BOLD' style={styles.itemSubtitle}>{` (${packageType})`}</ISText>
          </ISText>
          <ISText type='BOLD' style={styles.itemDisplayName}>{packageDisplayName}</ISText>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.rowContainer}>
            <ISText type='SEMIBOLD' style={styles.itemRowTitle}>{valueType}
              {packageRowItem.fup && <ISText type='BOLD' style={styles.itemSubtitle}>{` (${translate('BILLS_USAGE_MAXSPEED')})`}</ISText>}
            </ISText>
            <ISText type='SEMIBOLD' style={styles.consumedValue}>
              {(!isUnlimited) ? value : translate('BILLS_USAGE_UNLIMITED')}
              {(!isUnlimited && unit) && <ISText type='SEMIBOLD' style={styles.consumedValueUnit}>{' ' + unit}</ISText>}
            </ISText>
          </View>
          {!isPrepaid && <View style={styles.rowContainer}>
            <View style={styles.packageRowLeft}>
              <ProgressBar fillColor={colors.SECONDARY_TMOVE} backgroundColor={colors.PRIMARY_BG_SEPARATOR} percentage={percentageValue} />
            </View>
            <View style={styles.packageRowRight}>
              {(initialQuotaUnit && initialQuota) && <ISText type='SEMIBOLD' style={styles.totalValue}>{translate('BILLS_USAGE_OF') + ' ' + initialValue} {!isUnlimited ? initialValueUnit : ''}</ISText>}
            </View>
          </View>}
          {endDate ? <View style={styles.rowContainer}>
            <ISText type='SEMIBOLD' style={styles.itemRowTitle}>{translate('BILLS_USAGE_VALID_UNTIL')}</ISText>
            <ISText type='SEMIBOLD' style={styles.itemRowValue}>{new moment(endDate).format('DD/MM/YYYY')} </ISText>
          </View> : null}
        </View>
      </View>
    );
  }
}

ExtraPackageRow.defaultProps = {
  packageRowItem: {},
  index: -1,
  packageType: '',
  length: 0,
  hideSeparator: 0,
  isPrepaid: false
};

ExtraPackageRow.propTypes = {
  packageRowItem: PropTypes.object,
  index: PropTypes.number,
  packageType: PropTypes.string,
  length: PropTypes.number,
  hideSeparator: PropTypes.number,
  isPrepaid: PropTypes.bool
};

export default ExtraPackageRow;
