import {all, call, put, take} from 'redux-saga/effects';
import {fetchTranslations} from './translations.saga';
import {initializeAuth} from './auth.saga';
import {initializeFirebase} from './firebase.saga';
import * as actions from '../actions/index.actions';

// All the app startup related operation should go here
export default function* startupSaga () {
  try {
    yield put(actions.showSpinner());
    yield put(actions.initializeData());
    yield take(actions.INITIALIZE_DATA_SUCCEEDED);
    // TASKS TO RUN IN PARALLEL
    // FOR EACH TASK: Wrap in try catch block
    // FOR CRITICAL TASK: Throw from the catch block
    // FOR NON-CRITICAL TASK: Do not throw error and handle the error in the saga catch
    yield all([
      yield call(initializeAuth), // Start up tasks for auth
      yield call(fetchTranslations), // Fetch translations
      yield call(initializeFirebase), // FirebaseSaga
      yield put(actions.autoDetectMSISDN())
    ]);
    yield put(actions.hideSpinner());
    // NOTIFY THE STARTUP SAGA COMPLETE
    yield put(actions.startupSagaComplete());
  } catch (e) {
    yield put(actions.hideSpinner());
    // TODO Keeping this console log so that we dont spend hours figuring out what happened. Remove this when we implement actual handler here.
    console.log('INIT ERROR', e); //eslint-disable-line
    // CRITICAL TASK FAILURE
    // Display failure message
    // Exit the app
  }
}
