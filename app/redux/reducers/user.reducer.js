import * as actions from '../actions/index.actions';

const initialState = {
  accessToken: null,
  language: 'th',
  profile: {}
};

export default function user (state = initialState, {type, payload}) {
  switch (type) {
  case actions.LOGIN_SUCCESS:
  case actions.REGISTER_SUCCESS:
  case actions.SET_ACCESS_TOKEN_AND_PROFILE:
    return {...state, ...payload};
  case actions.LOGIN_FAILURE:
  case actions.REGISTER_FAILURE:
    return {...state, ...payload};
  case actions.LOGOUT_SUCCESS:
    return {...state, profile: {}, accessToken: null};
  case actions.SET_PREFERENCES:
    return {...state, ...payload};
  case actions.CHANGE_LANGUAGE:
    return {...state, ...payload};
  case actions.CHANGE_CURRENT_LOCATION:
    return {...state, currentLocation: payload};
  default:
    return state;
  }
}
