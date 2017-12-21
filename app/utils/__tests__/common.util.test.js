import {bytesToSize, getSelector, phoneNumberFormatter, precisionFormatter, throwException, unformatPhoneNumber} from '../common.util';

describe('get selector: returns a selector function that selects a variable from the state', () => {
  const state = {
    test: {
      abc: 'def'
    }
  };
  it('Should select correct state variable when path is provided', () => {
    const selector = getSelector('test.abc');
    expect(selector(state)).toBe('def');
  });

  it('Should return null id incorrect state variable path is provided', () => {
    const selector = getSelector('test.abc.uvf');
    expect(selector(state)).toBe(null);
  });
});

describe('throwException: should throw error', () => {
  it('should throw the passed error', () => {
    const testError = {message: 'dummy'};
    expect(() => {
      throwException(testError);
    }).toThrow(testError);
  });
});

describe('phoneNumberFormatter: should format phone number', () => {
  it('should return formatted phone number', () => {
    const phoneNumber = phoneNumberFormatter('0123456789');
    expect(phoneNumberFormatter(phoneNumber)).toBe('012-345-6789');
  });
  it('should return formatted phone number', () => {
    const phoneNumber = phoneNumberFormatter('012345678');
    expect(phoneNumberFormatter(phoneNumber)).toBe('012345678');
  });
});

describe('unformatPhoneNumber: should format phone number', () => {
  it('should return unformatted phone number', () => {
    const result = unformatPhoneNumber('012-345-6789');
    expect(result).toBe('0123456789');
  });
  it('should return unformatted phone number', () => {
    const result = unformatPhoneNumber('01234-5678');
    expect(result).toBe('012345678');
  });
  it('should return phone number as it', () => {
    const result = unformatPhoneNumber('012345678');
    expect(result).toBe('012345678');
  });
});

describe('bytesToSize: should format data size with unit', () => {
  it('should return data in bytes if less than 1024 and no target unit', () => {
    const result = bytesToSize(1011, 'Bytes');
    expect(result).toEqual({value: '1011.00', unit: 'Bytes'});
  });
  it('should return initial data in 1 MB when 1024 KB and no targetUnit', () => {
    const result = bytesToSize(1024, 'KB');
    expect(result).toEqual({value: '1.00', unit: 'MB'});
  });
  it('should return initial data in KB when less than 1024 KB and target value in Bytes', () => {
    const result = bytesToSize(500, 'KB', 'Bytes');
    expect(result).toEqual({value: '512000.00', unit: 'Bytes'});
  });
  it('should return data in KB when more than 1024 KB', () => {
    const result = bytesToSize(1048576, 'KB');
    expect(result).toEqual({value: '1.00', unit: 'GB'});
  });
  it('should return data in TB', () => {
    const result = bytesToSize(5368709120, 'KB');
    expect(result).toEqual({value: '5.00', unit: 'TB'});
  });
});

describe('precisionFormatter: should return formatted values with precision', () => {
  it('should return as is, if not number', () => {
    const result = precisionFormatter('text', true);
    expect(result).toEqual('text');
  });
  it('should round off if number and show precision false', () => {
    const result = precisionFormatter('10.89897', false);
    expect(result).toEqual(11);
  });
  it('should fix if number and show precision true', () => {
    const result = precisionFormatter('10.8900', true);
    expect(result).toEqual('10.9');
  });
  it('should fix to 2 decimal point if number and show precision true', () => {
    const result = precisionFormatter('10.89655', true, 2);
    expect(result).toEqual('10.90');
  });
});
