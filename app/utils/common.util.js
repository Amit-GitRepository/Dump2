import result from 'lodash/result';
import {DATA_SIZES} from '../config/billUsage.config';

export const getSelector = (pathFromState) => (state) => result(state, pathFromState, null);

export const throwException = (err) => {
  throw err;
};

export const phoneNumberFormatter = (phoneNumber) => phoneNumber.replace(/(\w{3})(\w{3})(\w{4})/, '$1-$2-$3');

export const unformatPhoneNumber = (phoneNumber) => phoneNumber.split('-').join('');

// bytesToSize: if target unit is provided converts value to target unit else converts to the highest possible unit where value remains => 1
export const bytesToSize = (value, unit, targetUnit = '') => {
  const baseUnitIndex = DATA_SIZES.indexOf(unit);
  const targetUnitIndex = DATA_SIZES.indexOf(targetUnit);
  const valueInBytes = value * Math.pow(1024, baseUnitIndex);
  const sizedIndex = (targetUnitIndex !== -1) ? targetUnitIndex : parseInt(Math.floor(Math.log(valueInBytes) / Math.log(1024)), 10);
  return {value: (valueInBytes / Math.pow(1024, sizedIndex)).toFixed(2), unit: DATA_SIZES[sizedIndex]};
};

export const precisionFormatter = (value, showPrecision, precisionValue = 1) => isNaN(value) ? value
  : (showPrecision) ? Number(value).toFixed(precisionValue) : Math.round(value);
