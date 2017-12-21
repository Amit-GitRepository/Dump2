import {FORCE_UPDATE_ALERT_HIDDEN, FORCE_UPDATE_ALERT_VISIBLE} from '../actions/index.actions';

const initialState = {
  isUpdateAlertVisible: false,
  forced: false,
  appLinks: {}
};

export default function forceUpdate (state = initialState, action) {
  switch (action.type) {
  case FORCE_UPDATE_ALERT_VISIBLE : 
    return {...action.payload, isUpdateAlertVisible: true}; 
  case FORCE_UPDATE_ALERT_HIDDEN: 
    return  {...state, isUpdateAlertVisible: false}; 
  default :
    return state;  
  }
}