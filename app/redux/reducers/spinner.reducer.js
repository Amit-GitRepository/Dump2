import {SPINNER_HIDE, SPINNER_SHOW} from '../actions/index.actions';

// Initial State for spinner
const initialState = {count: 0};

export default function Spinner (state = initialState, action) {
  switch (action.type) {
  case SPINNER_SHOW: {
    return {count: state.count + 1};
  }
  case SPINNER_HIDE: {
    // the value of count should always be positive
    const spinnerCount = (state.count > 0) ? state.count - 1 : 0;
    return {count: spinnerCount};
  }
  default: {
    return state;
  }
  }
}
