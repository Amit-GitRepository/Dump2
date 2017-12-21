import bannerImage from '../../assets/bannerArea.png';
import launchPageTestIDs from '../../config/testid/launchPage';
import noop from 'lodash/noop';
import OTPPrompt from '../BillUsage/OTPPrompt/OTPPrompt.component';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Landing.style';
import {Banner, Button, Card, CircleShadowSeparator, IconTextInput, ISText, KeyboardScrollView, SquareIconButton} from '../Shared';
import {colors} from '../../themes/constants.styles';
import {Platform} from '../../utils/reactNative.util';
import {translate} from '../../language/i18n/helper';
import {View} from 'react-native';

class Landing extends Component {

  state = {
    showOTPModal: false,
    newMSISDN: this.props.msisdn,
    emptyMsisdn: false
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.msisdn !== nextProps.msisdn) {
      this.setState({newMSISDN: nextProps.msisdn});
    }
    if (nextProps.validateOTPStatus === 'true') {
      this.props.onPayPress(this.state.newMSISDN);
    }
  }

   confirmOTP = (otp) => {
     this.props.validateOTP({msisdn: this.state.newMSISDN, otp: otp});
   };

   sendOTP = () => {
     const {newMSISDN} = this.state;
     if (this.validateMSISDN(newMSISDN)) {
       this.props.sendOTP(newMSISDN);
       this.setState({showOTPModal: true});
     }
   };

   validateMSISDN = (msisdn) => {
     this.setState({emptyMsisdn: !msisdn});
     return !!msisdn;
   }

   payPress = () => {
     const {newMSISDN} = this.state;
     if (this.validateMSISDN(newMSISDN)) {
       this.props.onPayPress(newMSISDN);
     }
   };

   setMSISDN = (msisdn) => this.setState({newMSISDN: msisdn, emptyMsisdn: !msisdn});;

   onClosePress = () => this.setState({showOTPModal: false});

   render () {
     const {onLogin, onRegister, msisdn, sendOTPStatus, validateOTPStatus, navigatePayOthers} = this.props;
     const {newMSISDN, showOTPModal, emptyMsisdn} = this.state;
     const inputTextPadding = Platform.OS === 'ios' ? styles.paddingIOS : styles.paddingAndroid;
     return (
       <KeyboardScrollView contentContainerStyle={styles.contentContainer}>
         {(sendOTPStatus && showOTPModal) ?
           <OTPPrompt msisdn={newMSISDN} onLogin={onLogin} onConfirm={this.confirmOTP}
             onClosePress={this.onClosePress} validateOTPStatus={validateOTPStatus} sendOTP={this.sendOTP}/> : null}
         <Banner source={bannerImage} />
         <Card headerStyles={styles.cardHeaderStyles} containerStyles={styles.cardContainer} header={translate('LANDING__EASY_PAYMENT_TITLE')} elevation={2}>
           <View style={styles.cardBody}>
             <View style={styles.upperBody}>
               <IconTextInput multiline={false} style={{...styles.numberInput, ...inputTextPadding}} containerStyle={styles.numberInputContainer}
                 defaultValue={msisdn} placeholder={translate('LANDING__EASY_PAYMENT_INPUT_PLACEHOLDER')}
                 onChangeText={this.setMSISDN} type={'SECONDARY'}/>
               <ISText type={'SEMIBOLD'} style={(emptyMsisdn || this.props.sendOTPStatus === false) ? styles.errorText : styles.hideErrorText}>{(emptyMsisdn) ? translate('LANDING__EASY_PAYMENT_INPUT_ERROR') : translate('LANDING__EASY_PAYMENT_INVALID_INPUT_ERROR')}</ISText>
               <Button textType={'SEMIBOLD'} style={styles.payButton} textStyle={styles.payButtonText} text={translate('LANDING__EASY_PAYMENT_BUTTON_TEXT')}
                 onPress={this.payPress} accessibilityLabel='Landing_LoginButton'/>
             </View>
             <CircleShadowSeparator text={translate('LANDING__OR_SEPARATOR')}/>
             <View style={styles.lowerBody} accessibilityLabel='Landing_check&buy&pay'>
               <View style={styles.boxButtonContainer}>
                 <SquareIconButton onPress={this.sendOTP} iconName='check-usage' iconColor={colors.SECONDARY_TMOVE} title={translate('LANDING__CHECK_USAGE_TITLE')} subtitle={translate('LANDING__CHECK_USAGE_SUBTITLE')}/>
                 <SquareIconButton iconName='buy-package' iconColor={colors.SECONDARY_TONLINE} title={translate('LANDING__BUY_EXTRA_TITLE')} subtitle={translate('LANDING__BUY_EXTRA_SUBTITLE')}/>
                 <SquareIconButton iconName='pay-other' iconColor={colors.SECONDARY_TVISION} onPress={navigatePayOthers} title={translate('LANDING__PAY_OTHERS_TITLE')} subtitle={translate('LANDING__PAY_OTHERS_SUBTITLE')}/>
               </View>
             </View>
           </View>
         </Card>
         <View style={styles.fullAccessText}><ISText>{translate('LANDING__FULL_ACCESS_SEPARATOR')}</ISText></View>
         <Button textStyle={styles.loginButtonText} style={styles.loginButton} text={translate('LANDING__LOGIN_TRUEID_BUTTON_TEXT')} type='secondary' onPress={onLogin} accessibilityLabel={launchPageTestIDs.BTN__LOGIN_TRUEID_BUTTON_TEXT} testID={launchPageTestIDs.BTN__LOGIN_TRUEID_BUTTON_TEXT}/>
         <View style={styles.footer} accessibilityLabel='Landing_registerLink'>
           <ISText style={styles.dontHaveTrueId}>{translate('LANDING__REGISTER_TITLE')}</ISText>
           <Button textType={'REGULAR'} textStyle={styles.registerBtnText} text={translate('LANDING__REGISTER_SUBTITLE')} type='inline' onPress={onRegister}/>
         </View>
       </KeyboardScrollView>
     );
   }
}

Landing.defaultProps = {
  onLogin: noop,
  onRegister: noop,
  onPayPress: noop,
  msisdn: null,
  sendOTPStatus: false,
  showPopup: noop,
  hidePopup: noop,
  navigatePayOthers: noop
};

Landing.propTypes = {
  onLogin: Proptypes.func,
  onRegister: Proptypes.func,
  onPayPress: Proptypes.func,
  msisdn: Proptypes.string,
  sendOTPStatus: Proptypes.bool,
  validateOTPStatus: Proptypes.bool,
  sendOTP: Proptypes.func,
  validateOTP: Proptypes.func,
  navigatePayOthers: Proptypes.func
};

export default Landing;
