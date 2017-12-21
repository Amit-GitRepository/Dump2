import noop from 'lodash/noop';
import OTPConfig from '../../../config/otp.config';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ResendOTPCounter from './ResendOTPCounter.component';
import styles from './OTPPrompt.style';
import {Button, Card, IconTextInput, ISText} from '../../Shared';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class OTPPrompt extends Component {
  render () {
    const {msisdn, onLogin, onConfirm, onClosePress, validateOTPStatus, sendOTP} = this.props;
    let otp = '';
    const setOTP = (newOTP) => otp = newOTP;
    const confirmOTP = () => onConfirm(otp);
    return (
      <View style={styles.container} elevation={5}>
        <Card containerStyles={styles.cardContainer} header={translate('OTP_VERIFY')} closeIcon={true} onClosePress={onClosePress}>
          <View style={styles.content}>
            <ISText type={'SEMIBOLD'} style={styles.otpText}>{translate('OTP_MESSAGE')}</ISText>
            <ISText type={'BOLD'} style={styles.otpText}>{msisdn}</ISText>
            <ISText type={'SEMIBOLD'} style={styles.incorrectText}>{ (validateOTPStatus === false) ? translate('OTP_INCORRECT') : ''}</ISText>
            <IconTextInput type={'SECONDARY'} onChangeText={setOTP}/>
            <View style={styles.bottomText}>
              <ISText type={'SEMIBOLD'}>{translate('OTP_REF')}</ISText>
              <ResendOTPCounter time={OTPConfig.resendOTPTime} sendOTP={sendOTP}/>
            </View>
            <Button onPress={confirmOTP} text={translate('OTP_CONFIRM')} touchableStyle={styles.button} textStyle={styles.loginButtonText}/>
            <ISText type={'SEMIBOLD'}>{translate('OTP_OR')}</ISText>
            <Button onPress={onLogin} text={translate('LANDING__LOGIN_TRUEID_BUTTON_TEXT')}
              type='secondary' touchableStyle={styles.button} style={styles.cancelButtonContainer} textStyle={styles.cancelButtonText}/>
          </View>
        </Card>
      </View>
    );
  }
}

OTPPrompt.defaultProps = {
  msisdn: '',
  validateOTPStatus: false,
  onLogin: noop,
  onConfirm: noop,
  onClosePress: noop,
  sendOTP: noop
};

OTPPrompt.propTypes = {
  msisdn: PropTypes.string,
  validateOTPStatus: PropTypes.bool,
  onLogin: PropTypes.func,
  onConfirm: PropTypes.func,
  onClosePress: PropTypes.func,
  sendOTP: PropTypes.func
};

export default OTPPrompt;
