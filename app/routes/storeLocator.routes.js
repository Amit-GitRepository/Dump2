import ServiceDetails from '../components/StoreLocator/ServiceDetails/ServiceDetails.component';
import StoreDetails from '../pages/StoreLocator/StoreDetails.page';
import StoreLocatorListPage from '../pages/StoreLocator/StoreLocatorList.page';
import StoreLocatorMapPage from '../pages/StoreLocator/StoreLocatorMap.page';
import StoreLocatorTabs from '../pages/StoreLocator/StoreLocatorTabs.page';
import {getStackNavOption} from './helpers/route.helper';
import {StackNavigator, TabNavigator} from 'react-navigation';

const storeTabConfig = {
  StoreLocator: {
    screen: StoreLocatorMapPage,
    title: 'SIDE_MENU__TRUE_SHOP',
    showHamburger: true,
    gaScreenName: 'True Shop Location'
  },
  StoreLocatorList: {
    screen: StoreLocatorListPage,
    path: 'list',
    showHamburger: true,
    gaScreenName: 'True Shop List'
  }
};

const StoreTabs = TabNavigator(storeTabConfig, {
  tabBarComponent: StoreLocatorTabs,
  tabBarPosition: 'top',
  swipeEnabled: false,
  animationEnabled: true,
  lazy: true // it will not render both the tabs at the same time.
});

const storeLocatorConfig = {
  StoreLocator: {
    screen: StoreTabs,
    navigationOptions: getStackNavOption,
    path: 'store',
    requireLogin: false,
    title: 'SIDE_MENU__TRUE_SHOP',
    gaScreenName: 'True Shop Location'
  },
  StoreDetails: {
    screen: StoreDetails,
    requireLogin: false,
    navigationOptions: getStackNavOption,
    title: 'STORE_LOCATOR__TRUE_SHOP_INFO',
    gaScreenName: 'True Shop Info'
  },
  ServiceDetails: {
    screen: ServiceDetails,
    navigationOptions: getStackNavOption,
    title: 'STORE_LOCATOR__TRUE_SHOP_SERVICE_DETAIL',
    gaScreenName: 'True Shop Service Details'
  }
};

export const storeLocatorRouteConfig = {
  ...storeLocatorConfig,
  ...storeTabConfig
};

export default StackNavigator(storeLocatorConfig);
