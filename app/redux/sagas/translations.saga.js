import api from './api/api.saga';
import dbKeys from '../../config/dbKeys.config';
import I18n from '../../language/i18n';
import localStorage from '../../utils/localStorage.util';
import {call, take} from 'redux-saga/effects';
import {FETCH_TRANSLATIONS} from '../actions/index.actions';
import {getTranslations} from './api/apiHelper';

export function * fetchTranslations () {
  try {
    // Api call for fetching new translations
    const newTranslations = yield call(api, getTranslations());
    // Save the fetched translations for persistance and set it in I18n
    if (newTranslations.body) {
      yield call(localStorage.setItem, dbKeys.TRANSLATION_KEY, newTranslations.body);
      I18n.translations = newTranslations.body;
    }
    
  } catch (e) {
    // console.log(e, 'Fetch failed');
    // Fetch the translations from local storage
    const localTranslations = yield call(localStorage.getItem, dbKeys.TRANSLATION_KEY);
    if (localTranslations) {
      I18n.translations = localTranslations;
    }
  }
}

// Translation saga
export default function * translationsSaga () {
  yield take(FETCH_TRANSLATIONS);
  yield call(fetchTranslations);
}
