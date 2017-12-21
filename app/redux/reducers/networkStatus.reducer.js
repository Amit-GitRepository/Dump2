import {SET_NETWORK_STATUS} from '../actions/index.actions';

const initialState = {
  isConnected: true
};

export default function networkStatus (state = initialState, action) {
  switch (action.type) {
  case SET_NETWORK_STATUS:
    return {isConnected: action.payload};
  default:
    return state;
  }
}
