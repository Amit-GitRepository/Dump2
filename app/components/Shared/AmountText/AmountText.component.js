import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './AmountText.style';
import {currenyFormatter} from '../../../language/i18n/helper';
import {ISText} from '../../Shared';
import {View} from 'react-native';

class AmountText extends Component {
  render () {
    const {value, unitStyle, valueStyle, precisionStyle, style, displayPrecision, isTotalText} = this.props;
    const amount = String(currenyFormatter(value)).split('.');
    const unitTextStyle = isTotalText ? styles.unitTextTotal : styles.unitTextIndividulal;
    const amountTextStyle = isTotalText ? styles.amountTextTotal : styles.amountTextIndividual;
    const precisionTextStyle = isTotalText ? styles.precisionTextTotal : styles.precisionTextIndividual;

    return (
      <View style={[styles.container, style]}>
        <ISText style={[unitTextStyle, unitStyle]} type='BOLD'>{'\u0E3F'}</ISText>
        <ISText style={[amountTextStyle, valueStyle]} type='BOLD'>{amount[0]}</ISText>
        {displayPrecision && <ISText style={[precisionTextStyle, precisionStyle]} type='BOLD'>.{amount[1]}</ISText>}
      </View>);
  }
}
AmountText.defaultProps = {
  value: 0,
  valueStyle: {},
  precisionStyle: {},
  unitStyle: {},
  style: {},
  displayPrecision: true,
  isTotalText: false // Amount text type: total(large) and Individual(medium); styles are assigned on the basis of type
};
AmountText.propTypes = {
  value: Proptypes.number,
  valueStyle: Proptypes.object,
  precisionStyle: Proptypes.object,
  unitStyle: Proptypes.object,
  style: Proptypes.object,
  displayPrecision: Proptypes.bool,
  isTotalText: Proptypes.bool
};
export default AmountText;
