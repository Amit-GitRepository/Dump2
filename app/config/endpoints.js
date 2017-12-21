const endpoints = {
  api: {
    'TRANSLATIONS': '/translations',
    'MSISDN': '/user/detectMSISDN',
    'BILL_USAGE_PRODUCT_LIST': '/products',
    'BILL_USAGE_PREPAID_PRODUCT_DETAIL': '/productDetailsPrepaid',
    'BILL_USAGE_PRODUCT_DETAIL': '/productDetails',
    'BILL_USAGE_PRODUCT_BILL_DETAIL': '/invoices',
    'BILL_PREFERENCE': '/billingPreference',
    'REGISTER_EBILL': '/registerEbill',
    'PAY_EXISTING_CUSTOMER': '/payForExistingCustomer',
    'PAY_NEW_CUSTOMER': '/payForNewCustomer',
    'PAY_NON_LOGIN_USER': '/pay',
    'TOKENISE_CARD': '/tokens',
    'CARD': '/card',
    'REGISTER_FCM_TOKEN': '/registerToken',
    'DEREGISTER_FCM_TOKEN': '/deregisterToken',
    'GET_INVOICE_PDF': '/getInvoicePdf',
    'PAY_OTHERS_GET_PRODUCT': '/product',
    'PRE_LOGIN_PRODUCT': '/product'
  },
  mock: {
    'TRANSLATIONS': require('../../apiMock/translations.json'),
    'MSISDN': require('../../apiMock/detectMSISDN.json'),
    'BILL_USAGE_PRODUCT_LIST': require('../../apiMock/billUsageProducts.json'),
    'BILL_USAGE_PREPAID_PRODUCT_DETAIL': require('../../apiMock/productDetailsPrepaid.json'),
    'BILL_USAGE_PRODUCT_DETAIL': require('../../apiMock/productDetails.json'),
    'BILL_USAGE_PRODUCT_BILL_DETAIL': require('../../apiMock/invoices.json'),
    'BILL_PREFERENCE': require('../../apiMock/billingPreference.json'),
    'REGISTER_EBILL': require('../../apiMock/registerEbill.json'),
    'PAY_EXISTING_CUSTOMER': require('../../apiMock/payForExistingCustomer.json'),
    'PAY_NEW_CUSTOMER': require('../../apiMock/payForNewCustomer.json'),
    'PAY_NON_LOGIN_USER': require('../../apiMock/pay.json'),
    'TOKENISE_CARD': require('../../apiMock/tokens.json'),
    'CARD': require('../../apiMock/card.json'),
    'REGISTER_FCM_TOKEN': require('../../apiMock/registerToken.json'),
    'DEREGISTER_FCM_TOKEN': require('../../apiMock/deregisterToken.json'),
    'GET_INVOICE_PDF': require('../../apiMock/getInvoicePdf.json'),
    'PAY_OTHERS_GET_PRODUCT': require('../../apiMock/payOthersProduct.json'),
    'PRE_LOGIN_PRODUCT': require('../../apiMock/preLoginProduct.json')
  }
};

export default endpoints;
