import BillingMethodsPage from '../pages/BillingMethods/BillingMethods.page';
import EbillAddPage from '../pages/BillingMethods/EBillAdd.page';
import EbillEditPage from '../pages/BillingMethods/EBillEdit.page';
import {getStackNavOption} from './helpers/route.helper';
import {StackNavigator} from 'react-navigation';

const billingMethodsConfig = {
  BillingMethods: {
    screen: BillingMethodsPage,
    navigationOptions: getStackNavOption,
    showHamburger: true,
    requireLogin: true,
    gaScreenName: 'Billing Methods Page',
    title: 'SIDE_MENU__BILLING_METHODS'
  },
  EbillAdd: {
    screen: EbillAddPage,
    navigationOptions: getStackNavOption,
    requireLogin: true,
    gaScreenName: 'Add Ebill Page',
    title: 'BILLING_METHODS__ADD_EBILL'
  },
  EbillEdit: {
    screen: EbillEditPage,
    navigationOptions: getStackNavOption,
    requireLogin: true,
    gaScreenName: 'Edit Ebill Page',
    title: 'BILLING_METHODS__EDIT_EBILL'
  }
};

export const billingMethodsRouteConfig = billingMethodsConfig;

export default StackNavigator(billingMethodsConfig);
