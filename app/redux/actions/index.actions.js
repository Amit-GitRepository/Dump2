import {createAction} from 'redux-actions';

// ******************
//  ACTION CONSTANTS
// ******************

// NETWORK STATUS ACTION CONSTANTS
export const SET_NETWORK_STATUS = 'SET_NETWORK_STATUS';

// USER PREFERENCE CONSTANTS
export const SET_PREFERENCES = 'SET_PREFERENCES';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

// SPINNER ACTIONS
export const SPINNER_SHOW = 'SPINNER_SHOW';
export const SPINNER_HIDE = 'SPINNER_HIDE';

// CMS Translation ACTIONS;
export const FETCH_TRANSLATIONS = 'FETCH_TRANSLATIONS';

// DATABASE SEED ACTIONS
export const INITIALIZE_DATA = 'INITIALIZE_DATA';
export const INITIALIZE_DATA_SUCCEEDED = 'INITIALIZE_DATA_SUCCEEDED';

// START UP ACTIONS
export const STARTUP_SAGA_COMPLETE = 'STARTUP_SAGA_COMPLETE';

// LOGIN ACTIONS
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// REGISTER REQUEST
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

// CHECK_LOGIN ACTIONS
export const CHECK_EXISTING_LOGIN = 'CHECK_EXISTING_LOGIN';

// SET ACCESS TOKEN ACTIONS
export const SET_ACCESS_TOKEN_AND_PROFILE = 'SET_ACCESS_TOKEN_AND_PROFILE';

// SET MSISDN ACTION
export const SET_MSISDN = 'SET_MSISDN';

// FORCE UPDATE ACTIONS
export const FORCE_UPDATE_FAILED = 'FORCE_UPDATE_FAILED';

// ALERT VISIBILITY ACTIONS
export const FORCE_UPDATE_ALERT_VISIBLE = 'FORCE_UPDATE_ALERT_VISIBLE';
export const FORCE_UPDATE_ALERT_HIDDEN  = 'FORCE_UPDATE_ALERT_HIDDEN';

// AUTO_DETECT_MSISDN Action CREATORS;
export const AUTO_DETECT_MSISDN_REQUEST = 'AUTO_DETECT_MSISDN_REQUEST';
export const AUTO_DETECT_MSISDN_SUCCESS = 'AUTO_DETECT_MSISDN_SUCCESS';
export const AUTO_DETECT_MSISDN_FAIL = 'AUTO_DETECT_MSISDN_FAIL';

// OTP ACTIONS
export const SEND_OTP = 'SEND_OTP';
export const VALIDATE_OTP = 'VALIDATE_OTP';
export const SEND_OTP_STATUS = 'SEND_OTP_STATUS';
export const VALIDATE_OTP_STATUS = 'VALIDATE_OTP_STATUS';

export const RESET_PREPAY = 'RESET_PREPAY';

// LOGOUT ACTIONS
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// DEEPLINKING ACTIONS
export const DEEP_LINK_RECEIVED = 'DEEP_LINK_RECEIVED';

// STORELOCATOR ACTIONS
// CURRENT LOCATION ACTIONS
export const CHANGE_CURRENT_LOCATION = 'CHANGE_CURRENT_LOCATION';
// CLEAR PROVINCE ACTION
export const CLEAR_PROVINCE = 'CLEAR_PROVINCE';
// SELECT PROVINCE ACTION
export const SET_PROVINCE = 'SET_PROVINCE';
// SELECT PROVINCE ACTION
export const SET_SERVICE = 'SET_SERVICE';
// CLEAR PROVINCE ACTION
export const CLEAR_SERVICE = 'CLEAR_SERVICE';
// UPDATE NEARBY STORE ACTION
export const UPDATE_NEARBY_STORES = 'UPDATE_NEARBY_STORES';
// UPDATE KM RADIUS ACTION
export const UPDATE_KM_RADIUS = 'UPDATE_KM_RADIUS';
export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';
export const CLEAR_FILTERED_STORES = 'CLEAR_FILTERED_STORES';

// PAYMENT ACTIONS
export const PAY_NEW_CUSTOMER = 'PAY_NEW_CUSTOMER';
export const SHOW_PAYMENT_METHODS = 'SHOW_PAYMENT_METHODS';
export const PRE_LOGIN_PAYMENT = 'PRE_LOGIN_PAYMENT';
export const PAY_EXISTING_CUSTOMER = 'PAY_EXISTING_CUSTOMER';
export const REMOVE_EXISTING_CARD = 'REMOVE_EXISTING_CARD';
export const REMOVE_CARD_SUCCESSFUL = 'REMOVE_CARD_SUCCESSFUL';
export const SET_PAYMENT_ITEMS = 'SET_PAYMENT_ITEMS';
export const SET_PAYMENT_STATUS = 'SET_PAYMENT_STATUS';
export const SET_SAVED_CARDS = 'SET_SAVED_CARDS';
export const CLEAR_PAYMENT_DATA = 'CLEAR_PAYMENT_DATA';
export const REPLACE_CARD_AND_PAY = 'REPLACE_CARD_AND_PAY';

// PAY FOR OTHERS ACTIONS
export const GET_PRODUCTS_PAYMENT = 'GET_PRODUCTS_PAYMENT';
export const SET_PRODUCTS_PAYMENT = 'SET_PRODUCTS_PAYMENT';
export const TOGGLE_PAYOTHERS_PRODUCT_CHECK_STATUS = 'TOGGLE_PAYOTHERS_PRODUCT_CHECK_STATUS';
export const SET_PAYOTHERS_PRODUCT_BILL_DETAIL = 'SET_PAYOTHERS_PRODUCT_BILL_DETAIL';
export const TOGGLE_PAYOTHERS_BILL_DETAIL_CHECK_STATUS = 'TOGGLE_PAYOTHERS_BILL_DETAIL_CHECK_STATUS';
export const SET_PAYOTHERS_PRODUCT_COLLAPSE_STATUS = 'SET_PAYOTHERS_PRODUCT_COLLAPSE_STATUS';
export const TOGGLE_PAYOTHERS_PRODUCT_COLLAPSE_STATUS = 'TOGGLE_PAYOTHERS_PRODUCT_COLLAPSE_STATUS';

// BILLS AND USAGE
export const FETCH_BILL_USAGE_AND_NAVIGATE = 'FETCH_BILL_USAGE_AND_NAVIGATE';
export const GET_BILL_USAGE_PRODUCT_LIST = 'GET_BILL_USAGE_PRODUCT_LIST';
export const GET_BILL_USAGE_PRODUCT = 'GET_BILL_USAGE_PRODUCT';
export const SET_BILL_USAGE_PRODUCT_LIST = 'SET_BILL_USAGE_PRODUCT_LIST';
export const SET_BILL_USAGE_PRODUCT_COLLAPSE_STATUS = 'SET_BILL_USAGE_PRODUCT_COLLAPSE_STATUS';
export const TOGGLE_BILL_USAGE_PRODUCT_COLLAPSE_STATUS = 'TOGGLE_BILL_USAGE_PRODUCT_COLLAPSE_STATUS';
export const TOGGLE_BILL_USAGE_PRODUCT_CHECK_STATUS = 'TOGGLE_BILL_USAGE_PRODUCT_CHECK_STATUS';
export const GET_BILL_USAGE_PRODUCT_DETAIL = 'GET_BILL_USAGE_PRODUCT_DETAIL';
export const SET_BILL_USAGE_PRODUCT_DETAIL = 'SET_BILL_USAGE_PRODUCT_DETAIL';
export const GET_BILL_USAGE_PRODUCT_BILL_DETAIL = 'GET_BILL_USAGE_PRODUCT_BILL_DETAIL';
export const SET_BILL_USAGE_PRODUCT_BILL_DETAIL = 'SET_BILL_USAGE_PRODUCT_BILL_DETAIL';
export const GET_BILL_PREFERENCE = 'GET_BILL_PREFERENCE';
export const SET_BILL_PREFERENCE = 'SET_BILL_PREFERENCE';
export const TOGGLE_BILL_DETAIL_CHECK_STATUS = 'TOGGLE_BILL_DETAIL_CHECK_STATUS';
export const APPLY_FOR_EBILL = 'APPLY_FOR_EBILL';
export const GET_INVOICE_PDF = 'GET_INVOICE_PDF';
// FIREBASE NOTIFICATIONS
export const REGISTER_FCM_TOKEN = 'REGISTER_FCM_TOKEN';
export const DEREGISTER_FCM_TOKEN = 'DEREGISTER_FCM_TOKEN';

// POPUP ACTIONS
export const POPUP_SHOW = 'POPUP_SHOW';
export const POPUP_HIDE = 'POPUP_HIDE';
export const POPUP_PUT_ACTION = 'POPUP_PUT_ACTION';

// ******************
//  ACTIONS CREATORS
// ******************

// DATABASE SEED ACTIONS CREATOR
export const initializeData = createAction(INITIALIZE_DATA);
export const initializeDataSucceeded = createAction(INITIALIZE_DATA_SUCCEEDED);

// SPINNER ACTIONS CREATORS
export const showSpinner = createAction(SPINNER_SHOW);
export const hideSpinner = createAction(SPINNER_HIDE);

// CMS Translation ACTION CREATORS
export const getTranslations = createAction(FETCH_TRANSLATIONS);

// auto-detect number which is used for auto-login.
export const autoDetectMSISDN = createAction(AUTO_DETECT_MSISDN_REQUEST);
export const autoDetectMSISDNSuccess = createAction(AUTO_DETECT_MSISDN_SUCCESS);
export const autoDetectMSISDNFail = createAction(AUTO_DETECT_MSISDN_FAIL);

// OTP Send and validate
export const sendOTP = createAction(SEND_OTP);
export const validateOTP = createAction(VALIDATE_OTP);
export const sendOTPStatus = createAction(SEND_OTP_STATUS);
export const validateOTPStatus = createAction(VALIDATE_OTP_STATUS);

export const resetPrepay = createAction(RESET_PREPAY);

// NETWORK STATUS ACTION CREATORS
export const setNetworkStatus = createAction(SET_NETWORK_STATUS);

// USER PREFERENCE ACTION CREATORS
export const setPreferences = createAction(SET_PREFERENCES);
export const changeLanguage = createAction(CHANGE_LANGUAGE);

// START UP ACTION CREATORS
export const startupSagaComplete = createAction(STARTUP_SAGA_COMPLETE);

// LOGIN ACTION CREATORS
export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);

// REGISTER ACTION CREATORS
export const registerRequest = createAction(REGISTER_REQUEST);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFailure = createAction(REGISTER_FAILURE);

// LOGOUT ACTION CREATOR
export const logoutRequest = createAction(LOGOUT_REQUEST);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const logoutFailure = createAction(LOGOUT_FAILURE);

// CHECK_LOGIN ACTION CREATORS
export const loginWithExistingToken = createAction(CHECK_EXISTING_LOGIN);

// SET ACCESS TOKEN AND PROFILE ACTION CREATOR
export const setAccessTokenAndProfile = createAction(SET_ACCESS_TOKEN_AND_PROFILE);

// SET MSISDN
export const setMSISDN = createAction(SET_MSISDN);

// FORCE UPDATE ACTION CREATORS
export const forceUpdateFailed = createAction(FORCE_UPDATE_FAILED);

// ALERT VISIBILITY ACTION CREATORS
export const notifyAlertVisible = createAction(FORCE_UPDATE_ALERT_VISIBLE);
export const notifyAlertHidden = createAction(FORCE_UPDATE_ALERT_HIDDEN);

// DEEPLINKING ACTION CREATORS
export const deeplinkReceived = createAction(DEEP_LINK_RECEIVED);

// STORELOCATOR ACTION CREATORS
// CURRENT LOCATION ACTION CREATORS
export const changeCurrentLocation = createAction(CHANGE_CURRENT_LOCATION);
// CLEAR PROVINCE FROM DROPDOWN ACTION CREATOR
export const clearProvince = createAction(CLEAR_PROVINCE);
// SET PROVINCE FROM DROPDOWN ACTION CREATOR
export const setProvince = createAction(SET_PROVINCE);
// SET SERVICE FROM DROPDOWN ACTION CREATOR
export const setService = createAction(SET_SERVICE);
// CLEAR SERVICE FROM DROPDOWN ACTION CREATOR
export const clearService = createAction(CLEAR_SERVICE);
// UPDATE NEARBY STORES ACTION CREATOR
export const updateNearByStores = createAction(UPDATE_NEARBY_STORES);
// UPDATE KM RADIUS ACTION CREATOR
export const updateKMRadius = createAction(UPDATE_KM_RADIUS);
// CHANGE_SEARCH_TEXT
export const changeSearchText = createAction(CHANGE_SEARCH_TEXT);
export const clearFilteredStores = createAction(CLEAR_FILTERED_STORES);

// PAYMENT ACTIONS
export const payNewCustomer = createAction(PAY_NEW_CUSTOMER);
export const showPaymentMethods = createAction(SHOW_PAYMENT_METHODS);
export const preLoginPayment = createAction(PRE_LOGIN_PAYMENT);
export const payForExistingCustomer = createAction(PAY_EXISTING_CUSTOMER);
export const removeExisingCard = createAction(REMOVE_EXISTING_CARD);
export const removeCardSuccessful = createAction(REMOVE_CARD_SUCCESSFUL);
export const setPaymentItems = createAction(SET_PAYMENT_ITEMS);
export const setPaymentStatus = createAction(SET_PAYMENT_STATUS);
export const setSavedCards = createAction(SET_SAVED_CARDS);
export const clearPaymentData = createAction(CLEAR_PAYMENT_DATA);
export const replaceCardAndPay = createAction(REPLACE_CARD_AND_PAY);

// PAY FOR OTHERS ACTIONS
export const getPaymentProducts = createAction(GET_PRODUCTS_PAYMENT);
export const setPaymentProducts = createAction(SET_PRODUCTS_PAYMENT);
export const togglePayOthersProductCheckStatus = createAction(TOGGLE_PAYOTHERS_PRODUCT_CHECK_STATUS);
export const setPayOthersProductBillDetail = createAction(SET_PAYOTHERS_PRODUCT_BILL_DETAIL);
export const setPayOthersProductBillDetailCheckStatus = createAction(TOGGLE_PAYOTHERS_BILL_DETAIL_CHECK_STATUS);
export const setPayOthersProductCollapseStatus = createAction(SET_PAYOTHERS_PRODUCT_COLLAPSE_STATUS);
export const togglePayOthersProductCollapseStatus = createAction(TOGGLE_PAYOTHERS_PRODUCT_COLLAPSE_STATUS);

// BILLS AND USAGE
export const fetchBillUsageAndNavigate = createAction(FETCH_BILL_USAGE_AND_NAVIGATE);
export const getBillUsageProductList = createAction(GET_BILL_USAGE_PRODUCT_LIST);
export const getBillUsageProduct = createAction(GET_BILL_USAGE_PRODUCT);
export const setBillUsageProductList = createAction(SET_BILL_USAGE_PRODUCT_LIST);
export const toggleBillUsageProductCheckStatus = createAction(TOGGLE_BILL_USAGE_PRODUCT_CHECK_STATUS);
export const toggleBillUsageProductCollapseStatus = createAction(TOGGLE_BILL_USAGE_PRODUCT_COLLAPSE_STATUS);
export const setBillUsageProductCollapseStatus = createAction(SET_BILL_USAGE_PRODUCT_COLLAPSE_STATUS);
export const getBillUsageProductDetail = createAction(GET_BILL_USAGE_PRODUCT_DETAIL);
export const setBillUsageProductDetail = createAction(SET_BILL_USAGE_PRODUCT_DETAIL);
export const getBillUsageProductBillDetail = createAction(GET_BILL_USAGE_PRODUCT_BILL_DETAIL);
export const setBillUsageProductBillDetail = createAction(SET_BILL_USAGE_PRODUCT_BILL_DETAIL);
export const getBillingPreference = createAction(GET_BILL_PREFERENCE);
export const setBillingPreference = createAction(SET_BILL_PREFERENCE);
export const toggleBillDetailCheckStatus = createAction(TOGGLE_BILL_DETAIL_CHECK_STATUS);
export const applyForEBill = createAction(APPLY_FOR_EBILL);
export const getInvoicePdf = createAction(GET_INVOICE_PDF);
// FIREBASE NOTIFICATIONS
export const registerFCMToken = createAction(REGISTER_FCM_TOKEN);
export const deregisterFCMToken = createAction(DEREGISTER_FCM_TOKEN);

// POPUP ACTION CREATORS
export const showPopup = createAction(POPUP_SHOW);
export const hidePopup = createAction(POPUP_HIDE);
export const popupPutAction = createAction(POPUP_PUT_ACTION);
