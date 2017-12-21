import {POPUP_HIDE, POPUP_SHOW} from '../actions/index.actions';

const initialState = {
  message: {
    title: '',
    body: '',
    buttons: [
      {
        title: ''
      }
    ]
  },
  isOpen: false
};

export default function popup (state = initialState, action) {
  switch (action.type) {
  case POPUP_HIDE: {
    return {...state, isOpen: false};
  }
  case POPUP_SHOW: {
    return {...state, isOpen: true, message: action.payload};
  }
  default: {
    return state;
  }
  }
}
