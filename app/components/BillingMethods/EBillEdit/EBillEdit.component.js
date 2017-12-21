/* EBillEdit: allow you to edit ebill options for one account*/

import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './EBillEdit.style';
import {billFormats, emailRegex, msisdnRegex} from '../../../config/ebill.config';
import {Button, Card, ISText, ToggleButton} from '../../Shared';
import {colors} from '../../../themes/constants.styles';
import {Keyboard, TextInput, View} from 'react-native';
import {translate} from '../../../language/i18n/helper';

class EBillEdit extends Component {
  state = {
    valueMsisdn: '',
    valueEmail: '',
    errorMsisdn: null,
    errorEmail: null,
    isValidMsisdn: false,
    isValidEmail: false,
    editableMsisdn: false,
    msisdnActive: false,
    editableEmail: false,
    emailActive: false
  }

  componentWillMount () {
    const {defaultMSISDN, defaultEmail, accountType, billingFormat} = this.props;

    if (defaultMSISDN) {
      this.setState({
        valueMsisdn: defaultMSISDN,
        isValidMsisdn: true
      });
    }
    if (defaultEmail) {
      this.setState({
        valueEmail: defaultEmail,
        isValidEmail: true
      });
    }
    if (billingFormat === billFormats.SMS) {
      if (accountType === 'tmhPostpaid') {
        this.setState({
          editableMsisdn: false,
          msisdnActive: true
        });
      } else {
        this.setState({
          editableMsisdn: true,
          msisdnActive: true
        });
      }
    } else {
      this.setState({
        editableEmail: true,
        emailActive: true
      });
    }
  }

  onToggle = (billingFormat) => () => {
    const {accountType} = this.props;
    if (billingFormat === billFormats.SMS) {
      if (this.state.msisdnActive) {
        this.setState({
          msisdnActive: false,
          editableMsisdn: false
        });
      } else {
        if (accountType === 'tmhPostpaid') {
          this.setState({
            editableMsisdn: false,
            msisdnActive: true,
            editableEmail: false,
            emailActive: false
          });
        } else {
          this.setState({
            editableMsisdn: true,
            msisdnActive: true,
            editableEmail: false,
            emailActive: false
          });
        }
      }
    } else {
      if (this.state.emailActive) {
        this.setState({
          emailActive: false,
          editableEmail: false
        });
      } else {
        this.setState({
          editableMsisdn: false,
          msisdnActive: false,
          editableEmail: true,
          emailActive: true
        });
      }
    }
  }

  save = () => {
    let type = '';
    if (!this.state.msisdnActive && !this.state.emailActive) {
      type = billFormats.PAPER;
    } else if (this.state.msisdnActive) {
      type = billFormats.SMS;
    } else {
      type = billFormats.EMAIL;
    }
    if (type === billFormats.SMS && (!msisdnRegex.test(this.state.valueMsisdn) || this.state.valueMsisdn === '')) {
      this.invalidValue('BILLING_METHODS__ADD_INVALID_MSISDN', billFormats.SMS);
      return;
    }
    if (type === billFormats.EMAIL && (!emailRegex.test(this.state.valueEmail) || this.state.valueEmail === '')) {
      this.invalidValue('BILLING_METHODS__ADD_INVALID_EMAIL', billFormats.EMAIL);
      return;
    }
    this.props.onSaveAction({
      billingFormat: type,
      emailToRegister: type === billFormats.EMAIL ? this.state.valueEmail : '',
      msisdnToRegister: type === billFormats.SMS ? this.state.valueMsisdn : ''
    });
  }

  validValue = (value, type) => {
    if (type === billFormats.EMAIL) {
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
    if (type === billFormats.EMAIL) {
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
        ? this.validValue(value, billFormats.EMAIL)
        : this.invalidValue('BILLING_METHODS__ADD_INVALID_EMAIL', billFormats.EMAIL);
    } else {
      this.invalidValue('BILLING_METHODS__ADD_REQUIRED_EMAIL', billFormats.EMAIL);
    }
  };

  validateMSISDN = (value) => {
    if (value) {
      msisdnRegex.test(value)
        ? this.validValue(value, billFormats.SMS)
        : this.invalidValue('BILLING_METHODS__ADD_INVALID_MSISDN', billFormats.SMS);
    } else {
      this.invalidValue('BILLING_METHODS__ADD_REQUIRED_MSISDN', billFormats.SMS);
    }
  };

  onEndEditing = (event) => {
    const {billingFormat} = this.props;
    Keyboard.dismiss();
    if (billingFormat === billFormats.EMAIL) {
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
    if (type === billFormats.EMAIL) {
      this.setState({valueEmail: value});
    } else {
      this.setState({valueMsisdn: value});
    }
  };

  generateOption = (option) => {
    const {errorEmail, editableEmail, emailActive, editableMsisdn, msisdnActive, errorMsisdn, valueEmail, valueMsisdn} = this.state;
    let textInputColor = editableEmail ? colors.PRIMARY_TEXT_TAB_LABEL : colors.PRIMARY_DISABLED_BG_TEXT;
    let ebillOptionTitle =  translate('BILLING_METHODS__ADD_EMAIL');
    let errorOption  = errorEmail;
    let toggleValue = emailActive;
    let textViewOptions = {placeholder: translate('BILLING_METHODS__ADD_EMAIL_PLACEHOLDER'), editable: editableEmail, value: valueEmail, multiline: true};
    if (option === billFormats.SMS) {
      textInputColor = editableMsisdn ? colors.PRIMARY_TEXT_TAB_LABEL : colors.PRIMARY_DISABLED_BG_TEXT;
      ebillOptionTitle = translate('BILLING_METHODS__ADD_SMS');
      errorOption = errorMsisdn;
      toggleValue = msisdnActive;
      textViewOptions = {placeholder: translate('BILLING_METHODS__ADD_SMS_PLACEHOLDER'), editable: editableMsisdn, keyboardType: 'numeric', maxLength: 10, onFocus: this.onFocus, value: valueMsisdn, multiline: false};
    }
    return (
      <View style={styles.ebillOptionContainer}>
        <View style={styles.ebillOptionInput}>
          <ISText type='SEMIBOLD' style={styles.ebillOption}>{ebillOptionTitle}</ISText>
          <TextInput
            {...textViewOptions}
            autoCorrect={false}
            onChangeText={this.onChangeText(option)}
            onEndEditing={this.onEndEditing}
            placeholderTextColor={colors.PRIMARY_DISABLED_BG_TEXT}
            returnKeyType={'done'}
            style={{...styles.ebillOptionValue, color: textInputColor}}
            underlineColorAndroid={colors.TRANSPARENT}
          />
          <ToggleButton
            value={toggleValue}
            onChangeValue={this.onToggle(option)}
          />
        </View>
        {errorOption ? <ISText type='BOLD' style={styles.error}>{translate(errorOption)}</ISText> : null}
      </View>);
  }

  render () {
    const {productId} = this.props;

    return (
      <View style={styles.container}>
        <Card containerStyles={styles.cardContainer} header={productId}>
          <View style={styles.infoContainer}>
            <ISText type='SEMIBOLD' style={styles.info}>{translate('BILLING_METHODS__EBILL_EDIT_ENTER_INFO')}</ISText>
          </View>
          {this.generateOption(billFormats.SMS)}
          {this.generateOption(billFormats.EMAIL)}
          <View style={styles.termsContainer}>
            <ISText type='SEMIBOLD' style={styles.terms}>{translate('BILLING_METHODS__EBILL_EDIT_TERMS')}</ISText>
          </View>
        </Card>
        <View style={styles.buttonContainer}>
          <Button text={translate('BILLING_METHODS__EBILL_EDIT_SAVE')} onPress={this.save} />
        </View>
      </View>);
  }
}
EBillEdit.defaultProps = {
  onSaveAction: noop,
  defaultMSISDN: '',
  defaultEmail: ''
};
EBillEdit.propTypes = {
  onSaveAction: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
  defaultMSISDN: PropTypes.string,
  defaultEmail: PropTypes.string,
  accountType: PropTypes.string.isRequired,
  billingFormat: PropTypes.string.isRequired
};
export default EBillEdit;
