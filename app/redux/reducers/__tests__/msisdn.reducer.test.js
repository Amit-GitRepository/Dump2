import msisdn from '../msisdn.reducer';
import * as actions from '../../actions/index.actions';

describe('autoDetectMSISDN', () => {
  const initialState = {};

  it('should return default state by default', (done) => {
    expect(msisdn(initialState, '')).toEqual({});
    done();
  });

  it('should update the msisdn information with success payload', (done) => {
    const payload = {
      msisdn: 123456789,
      'x-forwarded-for': '10.10.1.0'
    };
    const detectMSISDNAction = {
      type: actions.AUTO_DETECT_MSISDN_SUCCESS,
      payload: payload
    };
    const expectedResult = payload;
    const result = msisdn(initialState, detectMSISDNAction);
    expect(result).toEqual(expectedResult);
    done();
  });

  it('should update the msisdn information with null if failed', (done) => {
    const payload = {
      msisdn: 'Authorization error'
    };
    const detectMSISDNAction = {
      type: actions.AUTO_DETECT_MSISDN_FAIL,
      payload: payload
    };
    const expectedResult = {
      msisdn: null
    };
    const result = msisdn(initialState, detectMSISDNAction);
    expect(result).toEqual(expectedResult);
    done();
  });
});
