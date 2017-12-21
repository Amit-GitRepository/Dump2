import api from './api/api.saga';
import Config from 'react-native-config';
import endpoints from '../../config/endpoints.js';
import RNDownloadManager from 'react-native-simple-download-manager';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {GET_INVOICE_PDF} from '../actions/index.actions';
import {getSelector} from '../../utils/common.util';
import {Linking} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Platform, Toast} from '../../utils/reactNative.util';
import {translate} from '../../language/i18n/helper';
import {validatePdfAvailability} from './api/apiHelper';
// Selectors
const icardSelector = getSelector('user.profile.idcard');
const msisdnSelector = getSelector('user.profile.trueid.mobile');

export function* getRequestData (invoiceNo) {
  const requestData = {
    headers: {
      'Authorization': `Bearer ${Config.ISERVICE_AUTH_TOKEN}`,
      'icard': `${yield select(icardSelector)}`,
      'msisdn': `${yield select(msisdnSelector)}`
    },
    url: `${Config.SUBSCRIBER_ENDPOINT}${endpoints.api.GET_INVOICE_PDF}/${invoiceNo}`,
    invoiceNo
  };
  return requestData;
}

export function* getInvoicePdf (action) {
  const {invoiceNo} = action.payload;
  const requestData = yield call(getRequestData, invoiceNo);
  if (Platform.OS === 'ios') {
    yield call(getInvoiceIos, requestData);
  } else {
    yield call(getInvoiceAndroid, requestData);
  }
}

export function* getInvoiceIos (requestData) {
  try {
    yield call(api, validatePdfAvailability(requestData.invoiceNo));
    const params = {
      url: requestData.url,
      headers: requestData.headers
    };
    yield put(NavigationActions.navigate({routeName: 'PackagePromoPage', params}));
  } catch (err) {
    yield call(Toast.show, translate('BILLS_USAGE_PDF_DOWNLOAD_FAIL'), Toast.LONG);
  }
}

export function* getInvoiceAndroid (requestData) {
  try {
    Toast.show(translate('BILLS_USAGE_PDF_DOWNLOAD_START'), Toast.LONG);
    const res = yield call(RNDownloadManager.download, requestData.url, requestData.headers, {
      downloadTitle: `invoice-${requestData.invoiceNo}.pdf`,
      downloadDescription: requestData.url,
      saveAsName: `invoice-${requestData.invoiceNo}.pdf`,
      allowedInRoaming: true,
      allowedInMetered: true,
      showInDownloads: true
    });
    Linking.openURL(res.reason);
  } catch (err) {
    Toast.show(translate('BILLS_USAGE_PDF_DOWNLOAD_FAIL'), Toast.LONG);
  }
}

export default function* invoicePdfSaga () {
  yield takeEvery(GET_INVOICE_PDF, getInvoicePdf);
}
