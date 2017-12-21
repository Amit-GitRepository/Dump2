import find from 'lodash/find';
import I18n from './index';
import startsWith from 'lodash/startsWith';
import {translations} from '../../config/language.config';

export const translate = (i18nKey, options) => {
  const translations = I18n.t(i18nKey, options);
  return translations;
};

export const currenyFormatter = (value) => I18n.toCurrency(value, {precision: 2, separator: '.', delimiter: ',', unit: ''}); // 1,000,000.00

export const changeLocale = (locale) => {
  const supportedLocale = find(Object.keys(translations), (localeInApp) => startsWith(locale, localeInApp));
  if (supportedLocale) {
    I18n.locale = locale;
  }
  return null;
};
