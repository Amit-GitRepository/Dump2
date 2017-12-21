import {isValidMSISDN} from '../msisdn.util';

describe('isValidMSISDN', () => {

  it('should return false in msisdn is null', () => {
    const result = isValidMSISDN(null);
    expect(result).toEqual(false);
  });

  it('should return false in msisdn does not match msisdn criteria', () => {
    const lessNumberOfDigitsMSISDN = '92611283';
    const result = isValidMSISDN(lessNumberOfDigitsMSISDN);
    expect(result).toEqual(false);
  });

  it('should return true if MSISDN matches MSISDN criteria', () => {
    const correctMSISDN = '6922611283';
    const result = isValidMSISDN(correctMSISDN);
    expect(result).toEqual(true);
  });

  it('should return false in MSISDN does not match MSISDN criteria', () => {
    const reandomString = 'random string with large characters';
    const result = isValidMSISDN(reandomString);
    expect(result).toEqual(false);
  });

  it('should return false in MSISDN does not matches MSISDN criteria', () => {
    const invalidMSISDN = '+66922611283';
    const result = isValidMSISDN(invalidMSISDN);
    expect(result).toEqual(false);
  });

  it('should return false in MSISDN does not matches MSISDN criteria', () => {
    const invalidMSISDN = '0066922611283';
    const result = isValidMSISDN(invalidMSISDN);
    expect(result).toEqual(false);
  });

  it('should return false in MSISDN does not contain all digits', () => {
    const invalidMSISDN = '6692261128r';
    const result = isValidMSISDN(invalidMSISDN);
    expect(result).toEqual(false);
  });

});
