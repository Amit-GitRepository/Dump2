import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './DetailCardRow.style';
import {fonts} from '../../../../themes/constants.styles';
import {Icon, ISText} from '../../../Shared';
import {precisionFormatter} from '../../../../utils/common.util';
import {QUOTA_TYPE, QUOTA_VALUE} from '../../../../config/billUsage.config';
import {translate} from '../../../../language/i18n/helper';
import {View} from 'react-native';

class DetailCardRow extends Component {
  render () {
    const {consumedValueStyle, unitStyle, subtextStyle, iconSize, showSeparator, value, unit, subText, icon, title, type} = this.props;
    const displayValue = precisionFormatter(value, type === QUOTA_TYPE.DATA || type === QUOTA_TYPE.WIFI); // Show precision if data
    const displayUnit = (unit === QUOTA_VALUE.MINUTES) ? translate('BILLS_USAGE_MIN') : unit;
    const consumerValueStyle = value === QUOTA_VALUE.UNLIMITED ?
      [styles.unlimitedTextStyle, consumedValueStyle] : [styles.consumedValueDefault, consumedValueStyle];
    const consumerValueTexttype = value === QUOTA_VALUE.UNLIMITED ? 'BOLD' : 'SEMIBOLD';

    return (
      <View style = {styles.parentContainer}>
        <View style = {styles.wrapper}>
          <View style = {styles.leftContainer}>
            {icon !== '' ? <Icon name = {icon} size = {iconSize} style={styles.iconStyle}/> :  null}
            <ISText style = {styles.titleText} type='BOLD'>{title ? translate(title) : type}</ISText>
          </View>
          <View style = {styles.rightContainer}>
            <ISText style = {styles.topRightContainer}>
              { value || value === 0 ? <ISText type={consumerValueTexttype} style = {consumerValueStyle}>{displayValue}</ISText> : null }
              { (unit && (value !== QUOTA_VALUE.UNLIMITED)) ? <ISText type='SEMIBOLD' style = {[styles.unitDefault, unitStyle]}> {displayUnit}</ISText> : null }
            </ISText>
            { subText ? <ISText type='SEMIBOLD' style = {[styles.subtextDefault, subtextStyle]}>{subText}</ISText> : null }
          </View>
        </View>
        {showSeparator && <View style = {styles.bottomBorderLine}/>}
      </View>
    );
  }
}
DetailCardRow.defaultProps = {
  consumedValueStyle: {},
  subtextStyle: {},
  unitStyle: {},
  iconSize: fonts.FONT_SIZE_XXL, // should be used for dynamic data when type is not known beforeHand
  type: '',
  showSeparator: true,
  value: '',
  unit: '',
  subText: '',
  icon: '',
  title: ''
};
DetailCardRow.propTypes = {
  consumedValueStyle: Proptypes.object,
  unitStyle: Proptypes.object,
  subtextStyle: Proptypes.object,
  iconSize: Proptypes.number,
  type: Proptypes.string,
  showSeparator: Proptypes.bool,
  value: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  unit: Proptypes.string,
  subText: Proptypes.string,
  icon: Proptypes.string,
  title: Proptypes.string
};
export default DetailCardRow;
