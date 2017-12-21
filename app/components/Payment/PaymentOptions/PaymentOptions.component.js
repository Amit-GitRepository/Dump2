import CardTypes from '../CardTypes/CardTypes.component';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './PaymentOptions.style';
import sumBy from 'lodash/sumBy';
import {AmountText, Button, Icon, ISText, RadioButton, WrapperCard} from '../../Shared';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class PaymentOptions extends Component {
  state = {
    paymentMethod: 'card'
  }

  onRadioSelect = (value) => () => {
    this.setState({paymentMethod: value});
  }

  navigateToPayment = () => {
    const {paymentMethod} = this.state;
    if (paymentMethod === 'card') {
      this.props.goToScreen('CardDetails');
    }
  }

  render () {
    const {paymentItems} = this.props;
    const paymentOptions = [
      {
        title: translate('PAYMENT__CC'),
        value: 'card',
        available: true,
        isSelected: true
      },
      {
        title: translate('PAYMENT__TRUE_SHOP'),
        value: 'shop',
        available: true,
        isSelected: false
      }
    ];
    const paymentSection = paymentOptions.map((option, index) =>
      <View key={index} style={styles.paymentOptionRow}>
        <RadioButton style={styles.radioButton} onRadioSelect={this.onRadioSelect(option.value)} isSelected={this.state.paymentMethod === option.value}/>
        <ISText type='SEMIBOLD' style={styles.paymentOptionRowTitle}>{option.title}</ISText>
        <View style={styles.iconWrapper}>
          {option.value === 'card' ? <CardTypes/> : null}
          {option.value === 'shop' ? <Icon name='fastlane' style={styles.fastlane}/> : null}
        </View>
      </View>
    );
    const amountToPay = sumBy(paymentItems, (item) => item.amount);
    return (
      <View style={styles.mainContainer}>
        <WrapperCard>
          <View style={styles.topSection}>
            <ISText type='BOLD' style={styles.amountText}>{translate('PAYMENT__AMOUNT')}</ISText>
            <AmountText isTotalText={true} value={amountToPay}/>
          </View>
          <View style={styles.textBar}>
            <ISText type='SEMIBOLD' style={styles.textBarTitle}>{translate('PAYMENT__CHOOSE_METHOD')}</ISText>
          </View>
          {paymentSection}
        </WrapperCard>
        <Button text={translate('PAYMENT__CONFIRM')} touchableStyle={styles.confirmButton} textStyle={styles.buttonTextStyle} onPress={this.navigateToPayment}/>
      </View>
    );
  }
}

PaymentOptions.defaultProps = {
  goToScreen: noop,
  paymentItems: []
};

PaymentOptions.propTypes = {
  goToScreen: PropTypes.func,
  paymentItems: PropTypes.array
};

export default PaymentOptions;
