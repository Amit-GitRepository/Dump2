import startsWith from 'lodash/startsWith';
import {POPUP_PUT_ACTION} from '../actions/index.actions';
import {put, takeLatest} from 'redux-saga/effects';

export function * putAction (action) {
  try {
    const {type, payload} = action.payload;
    // navigation actions doesn't follow flex action structure {type: , payload}
    // instead it follows {type: , routeName: , params: } etc
    if (startsWith(type, 'Navigation/')) {
      return yield put({type, ...payload});
    }
    yield put({type, payload});
  } catch (e) {
    // console.log(e);
  }
}

// Popup saga
export default function * popupSaga () {
  yield takeLatest(POPUP_PUT_ACTION, putAction);
}
