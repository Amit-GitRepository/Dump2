import includes from 'lodash/includes';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './TopUpMore.style';
import {Button, Card, IconTextInput, ISText} from '../../Shared';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class TopUpMore extends Component {
  state = {
    errorTopUpValue: false,
    topUpValue: 0
  }

  onChangeText = (text) => {
    this.validateTopUpValue(text);
  }

  validateTopUpValue (value) {
    const num = parseInt(value);
    const isDecimal = includes(value, '.');
    if (isDecimal || num < 20 || num % 10 !== 0 || num > 1000) {
      this.setState({errorTopUpValue: true});
    } else {
      this.setState({errorTopUpValue: false});
    }
    this.setState({topUpValue: value});
  }

  topUp = () => {
    const {setPaymentItems, goToScreen, paymentItems} = this.props;
    const topUpMsisdn = result(paymentItems[0], 'msisdn', '');
    setPaymentItems([{amount: parseInt(this.state.topUpValue), msisdn: topUpMsisdn, service: 'tmhPrepaid'}]);
    goToScreen('Payment');
  }

  render () {
    const {paymentItems} = this.props;
    const {errorTopUpValue, topUpValue} = this.state;
    const topUpMsisdn = result(paymentItems[0], 'msisdn', '');
    return (
      <View style={styles.mainContainer}>
        <Card header={`${translate('TOP_UP_MORE__CARD_HEADER')} ${topUpMsisdn}`} containerStyles={{flex: 0}}>
          <View style={styles.topContainer}>
            <ISText>{translate('TOP_UP_MORE__ENTER_AMOUNT')}</ISText>
            <IconTextInput type='SECONDARY' containerStyle={styles.input} placeholder='20-1000' keyboardType='numeric' onChangeText={this.onChangeText}/>
            {errorTopUpValue ? <ISText style={styles.errorText}>{translate('TOP_UP_MORE__ERROR')}</ISText> : null}
          </View>
          <View style={styles.bottomContainer}>
            <Button text={translate('TOP_UP__BUTTON')} onPress={this.topUp} disabled={errorTopUpValue || !topUpValue}/>
          </View>
        </Card>
      </View>
    );
  }
}

TopUpMore.defaultProps = {
  setPaymentItems: noop,
  goToScreen: noop,
  paymentItems: []
};

TopUpMore.propTypes = {
  paymentItems: PropTypes.array,
  setPaymentItems: PropTypes.func,
  goToScreen: PropTypes.func
};

export default TopUpMore;
