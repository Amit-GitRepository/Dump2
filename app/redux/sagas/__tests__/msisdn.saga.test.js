import api from '../api/api.saga';
import  msisdnSaga, {detectMSISDN} from '../msisdn.saga';
import sagaHelper from 'redux-saga-testing';
import {AUTO_DETECT_MSISDN_REQUEST, autoDetectMSISDNFail, autoDetectMSISDNSuccess} from '../../actions/index.actions';
import {call, put, takeLatest} from 'redux-saga/effects';
import {msisdnRequest} from '../../../redux/sagas/api/apiHelper';

describe('Testing the root saga', () => {
  const it = sagaHelper(msisdnSaga());
  it('should take AUTO_DETECT_MSISDN_REQUEST action', (result) => {
    expect(result).toEqual(takeLatest(AUTO_DETECT_MSISDN_REQUEST, detectMSISDN));
  });
  it('should call nothing after this', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('detectMSISDN success with msisdn detected', () => {
  const dummyResponseWithMSISDN = {
    body: {
      msisdn: 123456789,
      'x-forwarded-for': '10.10.1.0'
    }
  };

  const it = sagaHelper(detectMSISDN());
  it('should return the expected response', (result) => {

    expect(result).toEqual(call(api, msisdnRequest()));
    return dummyResponseWithMSISDN;
  });
  it('On success, dispatch success action', (result) => {
    expect(result).toEqual(put(autoDetectMSISDNSuccess(dummyResponseWithMSISDN.body)));
  });
});

describe('detectMSISDN success with msisdn not detected', () => {
  const dummyResponseWithNoMSISDN = {
    body: {
      msisdn: 'null'
    }
  };
  const it = sagaHelper(detectMSISDN());
  it('should return the expected response', (result) => {
    expect(result).toEqual(call(api, msisdnRequest()));
    return dummyResponseWithNoMSISDN;
  });
  it('On success, dispatch success action', (result) => {
    expect(result).toEqual(put(autoDetectMSISDNSuccess(dummyResponseWithNoMSISDN.body)));
  });
});

describe('detectMSISDN fail', () => {
  const errorResponse = 'Some api error';
  const it = sagaHelper(detectMSISDN());
  it('should return the expected response', (result) => {
    expect(result).toEqual(call(api, msisdnRequest()));
    return new Error(errorResponse);
  });
  it('On failure, dispatch failure action', (result) => {
    expect(result).toEqual(put(autoDetectMSISDNFail(errorResponse)));
  });
});
