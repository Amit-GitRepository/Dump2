import dbInitializerSaga, {initializeData} from '../dbInitializer.saga';
import dbKeys from '../../../config/dbKeys.config';
import localStorage from '../../../utils/localStorage.util';
import sagaHelper from 'redux-saga-testing';
import seedData from '../../../config/seedData.config';
import {call, put, take} from 'redux-saga/effects';
import {INITIALIZE_DATA, initializeDataSucceeded, setPreferences} from '../../actions/index.actions';
import {translations} from '../../../config/language.config';

describe('dbInitializationSaga: Testing the root Saga', () => {
  const it = sagaHelper(dbInitializerSaga());
  it('Should check for initlisation data action', (result) => {
    expect(result).toEqual(take(INITIALIZE_DATA));
  });
  it('Should then call the initializeData saga', (result) => {
    expect(result).toEqual(call(initializeData));
  });
  it('Should then dispatch an action for initialisation succeeded', (result) => {
    expect(result).toEqual(put(initializeDataSucceeded()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('initializeData: Testing the initialisation saga when localStorage is empty(first run)', () => {
  const it = sagaHelper(initializeData());
  it('Should fetch the initialisation key from localStorage which returns null ', (result) => {
    expect(result).toEqual(call(localStorage.getItem, dbKeys.INITIALIZATION_KEY));
    return null;
  });
  it('Should then initialized the database with seed data', (result) => {
    expect(result).toEqual(call(localStorage.multiSetItem, [dbKeys.USER_PREFERENCE_KEY, seedData.userPreference], [dbKeys.TRANSLATION_KEY, translations]));
  });
  it('Should then dispatch an action for setting user preferences with the seed data', (result) => {
    expect(result).toEqual(put(setPreferences(seedData.userPreference)));
  });
  it('Should then set the initialized key to true in localStorage', (result) => {
    expect(result).toEqual(call(localStorage.setItem, dbKeys.INITIALIZATION_KEY, true));
  });
});

const mockUserData = {};

describe('initializeData: Testing the initialisation saga when localStorage is already initialized', () => {
  const it = sagaHelper(initializeData());
  it('Should fetch the initialisation key from localStorage which returns true ', (result) => {
    expect(result).toEqual(call(localStorage.getItem, dbKeys.INITIALIZATION_KEY));
    return true;
  });
  it('Should then fetch the data from localStorage', (result) => {
    expect(result).toEqual(call(localStorage.getItem, dbKeys.USER_PREFERENCE_KEY));
    return mockUserData;
  });
  it('Should then dispatch an action for setting user preferences with the fetched data', (result) => {
    expect(result).toEqual(put(setPreferences(mockUserData)));
  });
});
