import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './TopUp.style';
import {availablePackagesConfig} from '../../../config/topUp.config';
import {Button, Dropdown, ISText, RadioGroup, WrapperCard} from '../../Shared';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class TopUp extends Component {
  state = {
    msisdn: (this.props.prepaidNumbers.length === 1) ? this.props.prepaidNumbers[0] : null,
    value: null
  }

  setTopUpMsisdn = (msisdn) => {
    this.setState({msisdn: msisdn});
  }

  setTopUpValue = (value) => {
    if (value !== 'more') {
      this.setState({value: parseInt(value)});
    } else {
      this.setState({value});
    }
  }

  topUp = () => {
    const {goToScreen, setPaymentItems} = this.props;
    const {value, msisdn} = this.state;
    setPaymentItems([{msisdn, amount: value, service: 'tmhPrepaid'}]);
    if (value === 'more') {
      goToScreen('TopUpMore');
    } else {
      goToScreen('Payment');
    }
  }

  render () {
    const {msisdn, value} = this.state;
    const {prepaidNumbers} = this.props;
    return (
      <View style={styles.mainContainer}>
        <WrapperCard>
          <View style={styles.topContainer}>
            <ISText type='SEMIBOLD' style={styles.numberInputTitle}>{translate('TOP_UP__SELECT_PREPAID_NO')}</ISText>
            <View style={styles.dropdownContainer}>
              <Dropdown data={prepaidNumbers} unselectedText={translate('TOP_UP__MSISDN_DROPDOWN')} onSelect={this.setTopUpMsisdn} value={msisdn}/>
            </View>
            <ISText type='SEMIBOLD' style={styles.amountSelectTitle}>{translate('TOP_UP__SELECT_AMOUNT')}</ISText>
            <RadioGroup radioButtonStyle={styles.radioButtonStyle} radioGroupData={availablePackagesConfig} onChange={this.setTopUpValue}/>
          </View>
          <View style={styles.bottomContainer}>
            <Button text={translate('TOP_UP__BUTTON')} disabled={!(msisdn && value)} onPress={this.topUp}/>
          </View>
        </WrapperCard>
      </View>
    );
  }
}

TopUp.defaultProps = {
  prepaidNumbers: [],
  goToScreen: noop,
  setPaymentItems: noop
};

TopUp.propTypes = {
  prepaidNumbers: PropTypes.array,
  goToScreen: PropTypes.func,
  setPaymentItems: PropTypes.func
};

export default TopUp;
