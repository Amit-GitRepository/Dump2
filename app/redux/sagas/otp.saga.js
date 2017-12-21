import api from './api/api.saga';
import {call, put, takeLatest} from 'redux-saga/effects';
import {SEND_OTP, sendOTPStatus, VALIDATE_OTP, validateOTPStatus} from '../actions/index.actions';
import {sendOTPRequest, validateOTPRequest} from './api/apiHelper';

export function* sendOTP ({payload}) {
  try {
    const sendOTPResponse = yield call(api, sendOTPRequest(payload));
    const otpInfo = JSON.parse(sendOTPResponse.text);
    const status = otpInfo.code === 200;
    yield put(sendOTPStatus(status));
  } catch (err) {
    // console.log(err); TODO Error handling
  }
}

export function* validateOTP ({payload}) {
  try {
    const {msisdn, otp, navigateToExtraPackage} = payload;
    const sendOTPResponse = yield call(api, validateOTPRequest(msisdn, otp));
    const otpInfo = JSON.parse(sendOTPResponse.text);
    const status = otpInfo.code === 200;
    yield put(validateOTPStatus({status, navigateToExtraPackage}));
  } catch (e) {
    // console.log(err); TODO Error handling
  }
}

// OTP saga
export default function * otpSaga () {
  yield takeLatest(SEND_OTP, sendOTP);
  yield takeLatest(VALIDATE_OTP, validateOTP);
}
