import  popupSaga, {putAction} from '../popup.saga';
import sagaHelper from 'redux-saga-testing';
import {POPUP_PUT_ACTION} from '../../actions/index.actions';
import {put, takeLatest} from 'redux-saga/effects';

describe('Testing the root saga', () => {
  const it = sagaHelper(popupSaga());
  it('should take POPUP_PUT_ACTION action', (result) => {
    expect(result).toEqual(takeLatest(POPUP_PUT_ACTION, putAction));
  });
  it('should call nothing after this', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('putAction with xaction to fire in payload', () => {
  const it = sagaHelper(putAction({payload: {type: 'HELLO'}}));
  it('On success, dispatchs xaction', (result) => {
    expect(result).toEqual(put({type: 'HELLO'}));
  });
});
