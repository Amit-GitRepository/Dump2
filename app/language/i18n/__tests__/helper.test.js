import {changeLocale, currenyFormatter, translate} from '../helper';

describe('Language Helper', () => {
  it('should get the correct translated value for given key', () => {
    expect(translate('LANGUAGE_EN')).toEqual('English');
  });

  it('should get the return response for given key', () => {
    expect(translate('APURVA')).toEqual('[missing "en.APURVA" translation]');
  });

  it('should get the correct translated value for given key with a variable', () => {
    expect(translate('REMAINING_BALANCE', {balance: 100})).toEqual('$100');
  });

  it('should change the locale value', () => {
    // console.log('hey', changeLocale('th'));
    expect(changeLocale('th')).toEqual(null);
    expect(translate('LANGUAGE_EN')).toEqual('อังกฤษ');
  });

  it('should not change the locale value', () => {
    expect(changeLocale()).toEqual(null);
    expect(translate('LANGUAGE_EN')).toEqual('อังกฤษ');
  });
});

describe('currenyFormatter Helper', () => {
  it('should format the currency numbers', () => {
    const result = '1,000,000.00';
    expect(currenyFormatter(1000000.00)).toEqual(result);
  });
  it('should round-off precision and format the currency numbers', () => {
    const result = '1,000,000.68';
    expect(currenyFormatter(1000000.6798)).toEqual(result);
  });
});
