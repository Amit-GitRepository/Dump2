import BillUsage from '../pages/BillUsage/BillUsage.page';
import ISWebView from '../pages/ISWebView/ISWebView.page';
import Payment from './payment.routes';
import PreLoginPayBill from '../pages/BillUsage/PreLoginPayBill.page';
import TMBillDetail from '../pages/BillUsage/TMBillDetail.page';
import TMPackageDetailsExtraPage from '../pages/BillUsage/TMPackageDetailsExtra.page';
import TOLPackageDetail from '../pages/BillUsage/TOLPackageDetails.page';
import TopUpMore from '../pages/TopUp/TopUpMore.page';
import TVPackageDetail from '../pages/BillUsage/TVPackageDetails.page';
import {getStackNavOption} from './helpers/route.helper';
import {StackNavigator} from 'react-navigation';

export const billUsageRouteConfig = {
  BillUsage: {
    screen: BillUsage,
    navigationOptions: getStackNavOption,
    path: 'billusage',
    requireLogin: true,
    showHamburger: true,
    title: 'BILLS_USAGE',
    gaScreenName: 'Bills & Usage'
  },
  PreLoginPayBill: {
    screen: PreLoginPayBill,
    navigationOptions: getStackNavOption,
    path: 'preloginpaybill',
    requireLogin: false,
    showHamburger: true,
    title: 'BILLS_USAGE',
    gaScreenName: 'Pre Login Pay Bill'
  },
  TMPackageDetailsExtra: {
    screen: TMPackageDetailsExtraPage,
    requireLogin: false,
    navigationOptions: getStackNavOption,
    gaScreenName: 'Bill Usage Package Details and Extra Packages'
  },
  TMoveBillDetail: {
    screen: TMBillDetail,
    navigationOptions: getStackNavOption,
    gaScreenName: 'TrueMoveH Bill Invoice'
  },
  TOLPackageDetail: {
    screen: TOLPackageDetail,
    requireLogin: true,
    title: 'PACKAGE_DETAIL__TITLE',
    navigationOptions: getStackNavOption,
    gaScreenName: 'True Online Package Details'
  },
  TVPackageDetail: {
    screen: TVPackageDetail,
    requireLogin: true,
    title: 'PACKAGE_DETAIL__TITLE',
    navigationOptions: getStackNavOption,
    gaScreenName: 'True Vision Package Details'
  },
  PackagePromoPage: {
    screen: ISWebView,
    navigationOptions: getStackNavOption
  },
  BillUsageTopUpMore: {
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

export default StackNavigator(billUsageRouteConfig, {headerMode: 'screen'});
