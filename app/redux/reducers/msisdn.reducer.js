import {AUTO_DETECT_MSISDN_FAIL, AUTO_DETECT_MSISDN_SUCCESS} from '../actions/index.actions';

export default function autoDetectMSISDN (state = {}, action) {
  switch (action.type) {
  case AUTO_DETECT_MSISDN_SUCCESS:
    return action.payload;
  case AUTO_DETECT_MSISDN_FAIL:
    return {msisdn: null};
  default:
    return state;
  }
}
