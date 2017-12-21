import api from '../../sagas/api/api.saga';
import dbKeys from '../../../config/dbKeys.config';
import localStorage from '../../../utils/localStorage.util';
import sagaHelper from 'redux-saga-testing';
import translationSaga, {fetchTranslations} from '../translations.saga';
import {call, take} from 'redux-saga/effects';
import {FETCH_TRANSLATIONS} from '../../actions/index.actions';
import {getTranslations} from '../../../redux/sagas/api/apiHelper';

const cmsMockData = {body: {
  en: {},
  th: {}
}
};

describe('translationSaga: Testing the root Saga', () => {
  const it = sagaHelper(translationSaga());
  it('Should take the fetch translation action', (result) => {
    expect(result).toEqual(take(FETCH_TRANSLATIONS));
  });
  it('Should then call the fetchTranslations saga', (result) => {
    expect(result).toEqual(call(fetchTranslations));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('fetchTranslations: Testing the success case for Fetch Translations Saga', () => {
  const it = sagaHelper(fetchTranslations());
  it('Should call the api to fetch translations from cms which returns cms data', (result) => {
    expect(result).toEqual(call(api, getTranslations()));
    return cmsMockData;
  });
  it('Should save the translations to localStorage when the api is sucess', (result) => {
    expect(result).toEqual(call(localStorage.setItem, dbKeys.TRANSLATION_KEY, cmsMockData.body));
  });
});

describe('fetchTranslations: Testing the failure case for Fetch Translations Saga', () => {
  const it = sagaHelper(fetchTranslations());
  it('Should call the api to fetch translations from cms which returns error', (result) => {
    expect(result).toEqual(call(api, getTranslations()));
    return new Error('Api call failed');
  });
  it('Should fetch the translation from localStorage when api fails', (result) => {
    expect(result).toEqual(call(localStorage.getItem, dbKeys.TRANSLATION_KEY));
  });
});
