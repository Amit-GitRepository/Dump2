import Landing from '../pages/Landing/Landing.page';
import LaunchPage from '../pages/Launch/Launch.page';
import Payment from './payment.routes';
import {getStackNavOption} from './helpers/route.helper';
import {StackNavigator} from 'react-navigation';

export const landingRouteConfig = {
  LaunchPage: {
    screen: LaunchPage,
    requireLogin: false,
    gaScreenName: 'Launch Page'
  },
  Landing: {
    screen: Landing,
    navigationOptions: getStackNavOption,
    requireLogin: false,
    showIcon: true,
    showHamburger: true,
    gaScreenName: 'Landing Page'
  },
  Payment: {
    screen: Payment,
    navigationOptions: {header: null}
  }
};

export default StackNavigator(landingRouteConfig, {headerMode: 'screen'});
