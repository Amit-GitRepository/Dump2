import dbKeys from '../../config/dbKeys.config';
import localStorage from '../../utils/localStorage.util';
import seedData from '../../config/seedData.config';
import {call, put, take} from 'redux-saga/effects';
import {INITIALIZE_DATA, initializeDataSucceeded, setPreferences} from '../actions/index.actions';
import {translations} from '../../config/language.config';

export function * initializeData () {
  try {
    // Check if the database in initiased
    const initKey = yield call(localStorage.getItem, dbKeys.INITIALIZATION_KEY);
    if (!initKey) {
      // initiaise user preferences and default translation
      yield call(localStorage.multiSetItem, [dbKeys.USER_PREFERENCE_KEY, seedData.userPreference], [dbKeys.TRANSLATION_KEY, translations]);
      yield put(setPreferences(seedData.userPreference));
      // set initialisation Data to true
      yield call(localStorage.setItem, dbKeys.INITIALIZATION_KEY, true);
    } else {
      const userData = yield call(localStorage.getItem, dbKeys.USER_PREFERENCE_KEY);
      yield put(setPreferences(userData));
    }
  } catch (e) {
    // Unable to fetch the data from local storage
    // console.log(e, 'Fetch failed');
  }
}

// All the app startup related operation should go here
export default function * dbInitializerSaga () {
  yield take(INITIALIZE_DATA);
  yield call(initializeData);
  yield put(initializeDataSucceeded());
}
