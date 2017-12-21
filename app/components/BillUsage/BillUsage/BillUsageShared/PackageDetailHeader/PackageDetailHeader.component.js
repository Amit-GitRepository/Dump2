import I18n from '../../../../../language/i18n';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './PackageDetailHeader.style';
import {ISText} from '../../../../Shared';
import {translate} from '../../../../../language/i18n/helper';
import {View} from 'react-native';

class PackageDetailHeader extends Component {
  render () {
    const dueContainerStyle = I18n.currentLocale() === 'th' ? styles.enDueContainer : styles.thDueContainer;
    const {phoneNumber, name, endDate, isConvergence, isPrepaid, titleStyle, leftSectionStyle} = this.props;
    return (
      <View style = {(isConvergence || isPrepaid) ? styles.headerWrapperCenter : styles.headerWrapper}>
        <View style = {[(isConvergence || isPrepaid) && styles.alignCenter, leftSectionStyle]}>
          {name ? <ISText type = 'BOLD' style = {[styles.textWhite, titleStyle]}>{name}</ISText> : null}
          {phoneNumber ? <ISText type = 'BOLD' style = {styles.textWhiteLarge}>{phoneNumber}</ISText> : null}
        </View>
        { (!isConvergence && !isPrepaid && endDate) ?
          <View style = {styles.rightContainer}>
            <ISText type = 'BOLD' style = {styles.textWhite}>{translate('BILLS_USAGE_BILLING_CYCLE_END_DATE')}</ISText>
            <View style={[styles.dueContainer, dueContainerStyle]}>
              <ISText style = {styles.textMonth}>{translate('BILLS_USAGE_EVERY_MONTH', {date: ''})}</ISText>
              <ISText type = 'BOLD' style={styles.endDate}>{endDate}</ISText>
            </View>
          </View> :
          null}
      </View>
    );
  }
}
PackageDetailHeader.defaultProps = {
  name: '',
  phoneNumber: '',
  endDate: 0,
  isConvergence: false,
  isPrepaid: false,
  titleStyle: {},
  leftSectionStyle: {}
};
PackageDetailHeader.propTypes = {
  phoneNumber: Proptypes.string,
  name: Proptypes.string,
  endDate: Proptypes.number,
  isConvergence: Proptypes.bool,
  isPrepaid: Proptypes.bool,
  titleStyle: Proptypes.object,
  leftSectionStyle: Proptypes.object
};
export default PackageDetailHeader;
