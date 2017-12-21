import {
  LOGOUT_SUCCESS,
  SET_BILL_PREFERENCE
} from '../actions/index.actions';

const initialState = {
  billPreference: {
    PAPER: [],
    EMAIL: [],
    SMS: []
  }
};

export default function ebill (state = initialState, action) {
  switch (action.type) {
  case SET_BILL_PREFERENCE:
  {
    return {
      ...state,
      billPreference: action.payload || state.billPreference
    };
  }
  case LOGOUT_SUCCESS: {
    return initialState;
  }
  default:
    return state;
  }
}
