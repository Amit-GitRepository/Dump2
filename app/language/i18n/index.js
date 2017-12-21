/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import I18n from 'react-native-i18n';
import {defaultLocale, translations} from '../../config/language.config';

I18n.fallbacks = true;
I18n.defaultLocale = defaultLocale;

I18n.translations = translations;
export default I18n;
