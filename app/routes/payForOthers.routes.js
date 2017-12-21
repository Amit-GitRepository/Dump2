import ISWebView from '../pages/ISWebView/ISWebView.page';
import Payment from './payment.routes';
import PayOthersInput from '../pages/Payment/PayForOthers/PayOthersInput.page';
import PayOthersPostpaid from '../pages/Payment/PayForOthers/PayForOthersPostpaid.page';
import PayOthersTopUp from '../pages/Payment/PayForOthers/PayForOthersTopUp.page';
import TopUpMore from '../pages/TopUp/TopUpMore.page';
import {getStackNavOption} from './helpers/route.helper';
import {StackNavigator} from 'react-navigation';

export const payForOthersRouteConfig = {
  PayForOthers: {
    screen: PayOthersInput,
    requireLogin: false,
    showHamburger: true,
    title: 'PAY_OTHERS__TITLE',
    navigationOptions: getStackNavOption
  },
  PayOthersPostpaid: {
    screen: PayOthersPostpaid,
    requireLogin: false,
    title: 'TOP_UP_OTHERS_TITLE',
    navigationOptions: getStackNavOption
  },
  PayOthersTopUp: {
    screen: PayOthersTopUp,
    requireLogin: false,
    title: 'TOP_UP_OTHERS_TITLE',
    navigationOptions: getStackNavOption
  },
  TopUpMore: {
    screen: TopUpMore,
    navigationOptions: getStackNavOption,
    title: 'TOP_UP_MORE__TITLE',
    showHamburger: false,
    gaScreenName: 'Top Up More Page'
  },
  Payment: {
    screen: Payment,
    navigationOptions: {header: null}
  },
  PackagePromoPage: {
    screen: ISWebView,
    navigationOptions: getStackNavOption
  }
};

export default StackNavigator(payForOthersRouteConfig, {headerMode: 'screen'});
