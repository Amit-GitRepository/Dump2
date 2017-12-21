import billUsage from './billUsage.reducer';
import ebill from './ebill.reducer';
import forceUpdate from './forceUpdate.reducer';
import msisdn from './msisdn.reducer';
import nav from './nav.reducer';
import networkStatus from './networkStatus.reducer';
import payForOthers from './payForOthers.reducer';
import payment from './payment.reducer';
import popup from './popup.reducer';
import preLoginPay from './preLoginPay.reducer';
import spinner from './spinner.reducer';
import storeLocator from './storeLocator.reducer';
import user from './user.reducer';
import {combineReducers} from 'redux';

const appReducers = combineReducers({
  billUsage,
  ebill,
  forceUpdate,
  msisdn,
  nav,
  networkStatus,
  spinner,
  storeLocator,
  user,
  popup,
  payment,
  payForOthers,
  preLoginPay
});

export default appReducers;
