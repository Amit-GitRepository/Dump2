import BillingMethodsStack, {billingMethodsRouteConfig} from './billingMethods.routes';
import BillUsageStack, {billUsageRouteConfig} from './billUsage.routes';
import LandingStack, {landingRouteConfig} from './landing.routes';
import PayForOthersStack, {payForOthersRouteConfig} from './payForOthers.routes';
import SideMenu from '../pages/SideMenu/SideMenu.page';
import StoreLocatorStack, {storeLocatorRouteConfig} from './storeLocator.routes';
import TopUpStack, {topUpRouteConfig} from './topUp.routes';
import {DrawerNavigator} from 'react-navigation';
import {paymentRouteConfig} from './payment.routes';

export const routeConfig = {
  ...landingRouteConfig,
  ...billUsageRouteConfig,
  ...billingMethodsRouteConfig,
  ...storeLocatorRouteConfig,
  ...topUpRouteConfig,
  ...payForOthersRouteConfig,
  ...paymentRouteConfig
};

export default DrawerNavigator({
  Landing: {
    screen: LandingStack
  },
  BillUsage: {
    screen: BillUsageStack
  },
  StoreLocator: {
    screen: StoreLocatorStack
  },
  BillingMethods: {
    screen: BillingMethodsStack
  },
  TopUp: {
    screen: TopUpStack
  },
  PayForOthers: {
    screen: PayForOthersStack
  }
}, {
  contentComponent: SideMenu
});
