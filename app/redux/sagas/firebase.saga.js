import {call} from 'redux-saga/effects';
import {setupFirebase} from '../../utils/firebase.util';

export function* initializeFirebase () {
  try {
    yield call(setupFirebase); // returns value
    // FIREBASE_DB_SETUP_SUCCESS payload: val
  } catch (err) {
    // FIREBASE_DB_SETUP_FAILURE to payload: err
  }
}
