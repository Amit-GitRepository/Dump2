import Payment from './payment.routes';
import TopUp from '../pages/TopUp/TopUp.page';
import TopUpMore from '../pages/TopUp/TopUpMore.page';
import {getStackNavOption} from './helpers/route.helper';
import {StackNavigator} from 'react-navigation';

export const topUpRouteConfig = {
  TopUp: {
    screen: TopUp,
    navigationOptions: getStackNavOption,
    requireLogin: true,
    title: 'SIDE_MENU__TOP_UP',
    showHamburger: true,
    gaScreenName: 'Top Up Page'
  },
  TopUpMore: {
    screen: TopUpMore,
    navigationOptions: getStackNavOption,
    requireLogin: true,
    title: 'TOP_UP_MORE__TITLE',
    showHamburger: false,
    gaScreenName: 'Top Up More Page'
  },
  Payment: {
    screen: Payment,
    navigationOptions: {header: null}
  }
};

export default StackNavigator(topUpRouteConfig, {headerMode: 'screen'});
