import api from './api/api.saga';
import {AUTO_DETECT_MSISDN_REQUEST, autoDetectMSISDNFail, autoDetectMSISDNSuccess} from '../actions/index.actions';
import {call, put, takeLatest} from 'redux-saga/effects';
import {msisdnRequest} from './api/apiHelper';

export function* detectMSISDN () {
  try {
    const msisdnInfo = yield call(api, msisdnRequest());
    yield put(autoDetectMSISDNSuccess(msisdnInfo.body));
  } catch (e) {
    yield put(autoDetectMSISDNFail(e && e.message));
  }
}

// MSISDN detection saga
export default function * msisdnSaga () {
  yield takeLatest(AUTO_DETECT_MSISDN_REQUEST, detectMSISDN);
}
