import sagaHelper from 'redux-saga-testing';
import {call} from 'redux-saga/effects';
import {initializeFirebase} from '../firebase.saga';
import {setupFirebase} from '../../../utils/firebase.util';

describe('Firebase Saga: Testing the firebase Saga', () => {
  const it = sagaHelper(initializeFirebase());
  it('Should setup firebase', (result) => {
    expect(result).toEqual(call(setupFirebase));
  });
});
