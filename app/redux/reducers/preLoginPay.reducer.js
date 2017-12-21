import * as actions from '../actions/index.actions';

const initialState = {
  sendOTPStatus: null,
  validateOTPStatus: null,
  navigateToExtraPackage: false
};

export default function user (state = initialState, {type, payload}) {
  switch (type) {
  case actions.SET_MSISDN:
    return {...state, ...payload};
  case actions.SEND_OTP_STATUS:
    return {...state, sendOTPStatus: payload};
  case actions.VALIDATE_OTP_STATUS:
    return {...state, validateOTPStatus: payload.status, navigateToExtraPackage: payload.navigateToExtraPackage};
  case actions.RESET_PREPAY:
    return initialState;
  default:
    return state;
  }
}
