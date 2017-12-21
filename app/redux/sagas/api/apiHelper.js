import base64 from 'base-64';
import Config from 'react-native-config';

export const msisdnRequest = () => ({
  endpoint: 'MSISDN',
  baseUrl: Config.MSISDN_ENDPOINT
});

export const getTranslations  = () => ({
  endpoint: 'TRANSLATIONS',
  baseUrl: Config.CONTENT_ENDPOINT,
  query: {platform: 'mobile'}
});

export const billPreference = (accountIds) => ({
  endpoint: 'BILL_PREFERENCE',
  method: 'POST',
  baseUrl: Config.SUBSCRIBER_ENDPOINT,
  data: {
    accountIds
  }
});

export const registerEbill = (accounts) => ({
  endpoint: 'REGISTER_EBILL',
  method: 'POST',
  baseUrl: Config.SUBSCRIBER_ENDPOINT,
  data: accounts
});

export const payForExistingCustomer = (ssoId, data) => {
  const headers = {
    'ssoid': base64.encode(ssoId)
  };
  return {
    endpoint: 'PAY_EXISTING_CUSTOMER',
    baseUrl: Config.PAYMENT_ENDPOINT,
    headers,
    method: 'POST',
    intercept: true,
    data
  };
};

export const payForNewCustomer = (ssoId, data) => {
  const headers = {
    'ssoid': base64.encode(ssoId)
  };
  return {
    endpoint: 'PAY_NEW_CUSTOMER',
    baseUrl: Config.PAYMENT_ENDPOINT,
    headers,
    method: 'POST',
    intercept: true,
    data
  };
};

export const payForNonLoginUser = (data) => ({
  endpoint: 'PAY_NON_LOGIN_USER',
  baseUrl: Config.PAYMENT_ENDPOINT,
  method: 'POST',
  data
});

export const deleteCard = (ssoId, cardID) => {
  const headers = {
    'ssoid': base64.encode(ssoId)
  };
  return {
    endpoint: 'CARD',
    baseUrl: Config.PAYMENT_ENDPOINT,
    pathParam: `/${cardID}`,
    method: 'DELETE',
    intercept: true,
    headers
  };
};

export const getSavedCards = (ssoId) => {
  const headers = {
    'ssoid': base64.encode(ssoId)
  };
  return {
    endpoint: 'CARD',
    baseUrl: Config.PAYMENT_ENDPOINT,
    method: 'GET',
    intercept: true,
    headers
  };
};

export const tokeniseCard = (data) => {
  const pubKey = Config.OMISE_PUBLIC_KEY_ENCRYPTED;
  const headers = {'Authorization': `Basic ${pubKey}`};
  return {
    endpoint: 'TOKENISE_CARD',
    baseUrl: Config.OMISE_VAULT_URL,
    headers,
    method: 'POST',
    data
  };
};

export const billUsageProductList  = ({msisdn, idCard}) => ({
  endpoint: 'BILL_USAGE_PRODUCT_LIST',
  baseUrl: Config.SUBSCRIBER_ENDPOINT,
  data: {msisdn, idCard},
  method: 'POST'
});

export const preLoginProduct  = (id) => ({
  endpoint: 'PRE_LOGIN_PRODUCT',
  baseUrl: Config.SUBSCRIBER_ENDPOINT,
  pathParam: `/${id}`,
  method: 'GET'
});

export const billUsageProductDetail  = (productId, productType, subscriberId, subscriptionType) => ({
  endpoint: 'BILL_USAGE_PRODUCT_DETAIL',
  baseUrl: Config.SUBSCRIBER_ENDPOINT,
  data: {
    productId,
    productType,
    subscriberId,
    subscriptionType
  },
  method: 'POST'
});

// TODO CHANGE EVERYTHING
export const billUsageProductBillDetail  = (accountIds, isConvergence) => ({
  endpoint: 'BILL_USAGE_PRODUCT_BILL_DETAIL',
  baseUrl: Config.SUBSCRIBER_ENDPOINT,
  method: 'GET',
  query: {'accountNo': accountIds, isConvergence}
});

export const registerFCMToken = (ssoid, token) => ({
  endpoint: 'REGISTER_FCM_TOKEN',
  baseUrl: Config.NOTIFICATION_ENDPOINT,
  method: 'POST',
  data: {
    ssoid: ssoid,
    token: token
  },
  loader: false
});

export const deregisterFCMToken = (token) => ({
  endpoint: 'DEREGISTER_FCM_TOKEN',
  baseUrl: Config.NOTIFICATION_ENDPOINT,
  method: 'POST',
  data: {
    tokenList: [token]
  },
  loader: false
});

export const getProductFromServiceNo = (serviceNo) => ({
  endpoint: 'PAY_OTHERS_GET_PRODUCT',
  baseUrl: Config.SUBSCRIBER_ENDPOINT,
  method: 'GET',
  pathParam: `/${serviceNo}`
});

export const sendOTPRequest  = (msisdn) =>
  ({
    baseUrl: Config.OTP_ENDPOINT,
    method: 'GET',
    query: {'method': 'request_otp', 'project': 'iservice', 'app_id': 20, 'secret': '453d1a20c3acf2ca0d4e', 'otp_sender': 'iservice', 'type': 'sync', 'ln': 'en', 'msisdn': msisdn, 'channel': 'web', 'format': 'json'}
  });

export const validateOTPRequest  = (msisdn, otp) =>
  ({
    baseUrl: Config.OTP_ENDPOINT,
    method: 'GET',
    query: {'method': 'validate_otp', 'project': 'iservice', 'app_id': 20, 'secret': '453d1a20c3acf2ca0d4e', 'otp_sender': 'iservice', 'type': 'sync', 'ln': 'en', 'msisdn': msisdn, 'channel': 'web', 'otp': otp, 'format': 'json'}
  });

export const validatePdfAvailability = (invoiceNo) => (
  {
    baseUrl: Config.SUBSCRIBER_ENDPOINT,
    method: 'HEAD',
    endpoint: 'GET_INVOICE_PDF',
    pathParam: `/${invoiceNo}`
  }
);
