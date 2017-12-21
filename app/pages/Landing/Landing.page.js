import Landing from '../../components/Landing/Landing.component';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {isValidMSISDN} from '../../utils/msisdn.util';
import {loginRequest, registerRequest, sendOTP, setMSISDN, validateOTP} from '../../redux/actions/index.actions';
import {NavigationActions} from 'react-navigation';

class LandingPage extends Component {

  render () {
    const {loginRequest, msisdn, registerRequest, navigatePayOthers, navigatePayBill, setMSISDN, sendOTP, validateOTP, sendOTPStatus, validateOTPStatus} = this.props;
    const validatedMsisdn = isValidMSISDN(msisdn) ? msisdn : '';
    const setMSISDNAndPay = (msisdn) => {
      // TODO Handle wrong msisdn cases
      setMSISDN(msisdn);
      navigatePayBill(msisdn);
    };

    return (
      <Landing
        msisdn={validatedMsisdn}
        onLogin={loginRequest}
        onRegister={registerRequest}
        onPayPress={setMSISDNAndPay}
        sendOTP={sendOTP}
        validateOTP={validateOTP}
        sendOTPStatus={sendOTPStatus}
        validateOTPStatus={validateOTPStatus}
        navigatePayOthers={navigatePayOthers}
      />
    );
  }
}

LandingPage.propTypes = {
  loginRequest: Proptypes.func,
  registerRequest: Proptypes.func,
  navigatePayBill: Proptypes.func,
  setMSISDN: Proptypes.func,
  msisdn: Proptypes.string,
  sendOTPStatus: Proptypes.bool,
  validateOTPStatus: Proptypes.bool,
  sendOTP: Proptypes.func,
  validateOTP: Proptypes.func,
  navigatePayOthers: Proptypes.func
};

export const mapStateToProps = (state) => ({
  language: result(state, 'user.language', null),
  msisdn: String(result(state, 'msisdn.msisdn', '')),
  sendOTPStatus: result(state, 'preLoginPay.sendOTPStatus', null),
  validateOTPStatus: result(state, 'preLoginPay.validateOTPStatus', null)
});

export const mapDispatchToProps = (dispatch) => ({
  loginRequest: () => dispatch(loginRequest(NavigationActions.navigate({routeName: 'BillUsage'}))),
  navigatePayBill: (serviceNo) => {
    dispatch(NavigationActions.navigate({routeName: 'PreLoginPayBill', params: {serviceNo}}));
    const resetAction = NavigationActions.reset({index: 0,
      actions: [NavigationActions.navigate({routeName: 'PreLoginPayBill', params: {serviceNo}})]
    });
    return dispatch(resetAction);
  },
  setMSISDN: (msisdn) => dispatch(setMSISDN({msisdn: msisdn})),
  registerRequest: () => dispatch(registerRequest(NavigationActions.navigate({routeName: 'BillUsage'}))),
  sendOTP: (msisdn) => dispatch(sendOTP(msisdn)),
  validateOTP: (msisdn, otp) => dispatch(validateOTP(msisdn, otp)),
  navigatePayOthers: () => dispatch(NavigationActions.navigate({routeName: 'PayForOthers'}))
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
