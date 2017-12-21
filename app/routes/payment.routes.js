import CardDetails from '../pages/Payment/CardDetails.page';
import DismissableStackNavigator from '../pages/DismissableStackNavigator/DismissableStackNavigator.page';
import PaymentOptions from '../pages/Payment/PaymentOptions.page';
import PaymentStatus from '../pages/Payment/PaymentStatus.page';
import PaymentStatusDetails from '../pages/Payment/PaymentStatusDetails.page';
import {getPaymentStatusHeader} from './helpers/route.helper';

export const paymentRouteConfig = {
  PaymentOptions: {
    screen: PaymentOptions,
    navigationOptions: getPaymentStatusHeader,
    title: 'PAYMENT__PAYMENT_OPTIONS_TITLE',
    showBack: false,
    gaScreenName: 'Payment Options Page'
  },
  CardDetails: {
    screen: CardDetails,
    navigationOptions: getPaymentStatusHeader,
    title: 'PAYMENT__PAYMENT_OPTIONS_TITLE'
  },
  PaymentStatus: {
    screen: PaymentStatus,
    navigationOptions: getPaymentStatusHeader,
    title: 'PAYMENT__PAYMENT_OPTIONS_TITLE',
    showBack: false,
    gaScreenName: 'Payment Status Page'
  },
  PaymentStatusDetails: {
    screen: PaymentStatusDetails,
    navigationOptions: getPaymentStatusHeader,
    title: 'PAYMENT__VIEW_RECEIPT_TITLE',
    gaScreenName: 'Payment Status Details Page'
  }
};

export default DismissableStackNavigator(paymentRouteConfig);
