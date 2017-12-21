/* EbillAddItem: show single service item and provide option to add ebill or email*/

import camelCase from 'lodash/camelCase';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './EBillAddItem.style';
import {Checkbox, ISText} from '../../Shared';
import {colors} from '../../../themes/constants.styles';
import {emailRegex} from '../../../config/ebill.config';
import {Keyboard, TextInput, View} from 'react-native';
import {translate} from '../../../language/i18n/helper';

class EBillAddItem extends Component {
  state = {
    valueMsisdn: '',
    valueEmail: '',
    errorMsisdn: null,
    errorEmail: null,
    isValidMsisdn: false,
    isValidEmail: false,
    editableMsisdn: true,
    editableEmail: true
  }

  componentWillMount () {
    const {accountType, defaultMSISDN} = this.props;
    if (['True Move H postpaid'].includes(accountType)) {
      this.setState({
        valueMsisdn: defaultMSISDN,
        editableMsisdn: false,
        isValidMsisdn: true
      });
    }
  }

  componentWillUpdate (nextProps) {
    if (nextProps.billingFormat !== this.props.billingFormat) {
      this.setState({errorMsisdn: null, errorEmail: null});
    }
  }

  onBillToggle = (event) => {
    this.props.onToggleSelection(this.props.accountId, event);
  }

  validValue = (value, type) => {
    if (type === 'EMAIL') {
      this.setState({
        valueEmail: value,
        isValidEmail: true,
        errorEmail: null
      });
    } else {
      this.setState({
        valueMsisdn: value,
        isValidMsisdn: true,
        errorMsisdn: null
      });
    }
  };

  invalidValue = (error, type) => {
    if (type === 'EMAIL') {
      this.setState({
        isValidEmail: false,
        errorEmail: error
      });
    } else {
      this.setState({
        isValidMsisdn: false,
        errorMsisdn: error
      });
    }
  };

  validateEmail = (value) => {
    if (value) {
      emailRegex.test(value)
        ? this.validValue(value, 'EMAIL')
        : this.invalidValue('BILLING_METHODS__ADD_INVALID_EMAIL', 'EMAIL');
    } else {
      this.invalidValue('BILLING_METHODS__ADD_REQUIRED_EMAIL', 'EMAIL');
    }
  };

  validateMSISDN = (value) => {
    const msisdnRegex = /^\d{10}$/;

    if (value) {
      msisdnRegex.test(value)
        ? this.validValue(value, 'SMS')
        : this.invalidValue('BILLING_METHODS__ADD_INVALID_MSISDN', 'SMS');
    } else {
      this.invalidValue('BILLING_METHODS__ADD_REQUIRED_MSISDN', 'SMS');
    }
  };

  onEndEditing = (event) => {
    const {billingFormat} = this.props;
    Keyboard.dismiss();
    if (billingFormat === 'EMAIL') {
      this.validateEmail(event.nativeEvent.text);
    } else {
      this.validateMSISDN(event.nativeEvent.text);
    }
  }

  onFocus = () => this.setState({
    errorMsisdn: null,
    isValidMsisdn: false,
    errorEmail: null,
    isValidEmail: false
  })

  onChangeText = (type) => (value) => {
    this.props.onValueUpdate(this.props.accountId, value);
    if (type === 'EMAIL') {
      this.setState({valueEmail: value});
    } else {
      this.setState({valueMsisdn: value});
    }
  };

  generateOption = (option) => {
    const {editableMsisdn, errorMsisdn, errorEmail, valueEmail, valueMsisdn} = this.state;
    let ebillOptionTitle =  translate('BILLING_METHODS__ADD_EMAIL');
    let errorOption  = errorEmail;
    let textViewOptions = {placeholder: translate('BILLING_METHODS__ADD_EMAIL_PLACEHOLDER'), editable: true, value: valueEmail};
    if (option === 'SMS') {
      ebillOptionTitle = translate('BILLING_METHODS__ADD_SMS');
      errorOption = errorMsisdn;
      textViewOptions = {placeholder: translate('BILLING_METHODS__ADD_SMS_PLACEHOLDER'), editable: editableMsisdn, keyboardType: 'numeric', maxLength: 10, onFocus: this.onFocus, value: valueMsisdn};
    }
    return (
      <View style={styles.ebillOptionContainer}>
        <View style={styles.ebillOptionInput}>
          <ISText type='SEMIBOLD' style={styles.ebillOption}>{ebillOptionTitle}</ISText>
          <TextInput {...textViewOptions} autoCorrect={false} onChangeText={this.onChangeText(option)} onEndEditing={this.onEndEditing}  placeholderTextColor={colors.PRIMARY_DISABLED_BG_TEXT} returnKeyType={'done'} style={styles.ebillOptionValue} underlineColorAndroid={colors.TRANSPARENT}
          />
        </View>
        {errorOption ? <ISText type='BOLD' style={styles.error}>{translate(errorOption)}</ISText> : null}
      </View>);
  }

  render () {
    const {billingFormat, productId, accountType, isSelected} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.serviceInfoContainer}>
          <View>
            <ISText type='SEMIBOLD' style={styles.serviceNumber}>{productId}</ISText>
            <ISText type='BOLD' style={styles[camelCase(accountType)]}>{accountType}</ISText>
          </View>
          <View>
            <Checkbox style={styles.checkbox} isChecked={isSelected} onChange={this.onBillToggle}/>
          </View>
        </View>
        {this.generateOption(billingFormat)}
      </View>
    );
  }
}

EBillAddItem.defaultProps = {
  defaultMSISDN: ''
};

EBillAddItem.propTypes = {
  accountType: PropTypes.string.isRequired,
  billingFormat: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  defaultMSISDN: PropTypes.string,
  onToggleSelection: PropTypes.func.isRequired,
  onValueUpdate: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  accountId: PropTypes.string.isRequired
};

export default EBillAddItem;
