import api from '../api/api.saga';
import invoicePdfSaga, {getInvoiceAndroid, getInvoiceIos, getInvoicePdf, getRequestData} from '../invoicePdf.saga';
import RNDownloadManager from 'react-native-simple-download-manager';
import sagaHelper from 'redux-saga-testing';
import {call, put, takeEvery} from 'redux-saga/effects';
import {GET_INVOICE_PDF} from '../../actions/index.actions';
import {NavigationActions} from 'react-navigation';
import {Toast} from '../../../utils/reactNative.util';
import {translate} from '../../../language/i18n/helper';
import {validatePdfAvailability} from '../api/apiHelper';

describe('Testing the invoicePdfSaga saga', () => {
  const it = sagaHelper(invoicePdfSaga());
  it('should take GET_INVOICE_PDF action and call the getInvoicePdf saga', (result) => {
    expect(result).toEqual(takeEvery(GET_INVOICE_PDF, getInvoicePdf));
  });
  it('should call nothing after this', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('getINvoice Pdf saga', () => {
  const mockAction = {payload: {invoiceNo: 1234}};
  const mockRequesData = {
    headers: {
      'Authorization': 'Basic 1234',
      'icard': '9876543',
      'msisdn': '0957590128'
    },
    url: 'http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf',
    invoiceNo: mockAction.payload.invoiceNo
  };
  const it = sagaHelper(getInvoicePdf(mockAction));
  it('should call the getRequestData function', (result) => {
    expect(result).toEqual(call(getRequestData, 1234));
    return mockRequesData;
  });
  it('should call the getInvoiceAndorid function when the running platform is ios', (result) => {
    expect(result).toEqual(call(getInvoiceIos, mockRequesData));
  });
});

describe('getInvoiceAndroid saga', () => {
  const mockRequesData = {
    headers: {
      'Authorization': 'Basic 1234',
      'icard': '9876543',
      'msisdn': '0957590128'
    },
    url: 'http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf',
    invoiceNo: 1234
  };
  const mockRequestConfig =  {
    downloadTitle: `invoice-${mockRequesData.invoiceNo}.pdf`,
    downloadDescription: mockRequesData.url,
    saveAsName: `invoice-${mockRequesData.invoiceNo}.pdf`,
    allowedInRoaming: true,
    allowedInMetered: true,
    showInDownloads: true
  };
  const it = sagaHelper(getInvoiceAndroid(mockRequesData));
  it('should call the fetch function from the returned object with request data', (result) => {
    expect(result).toEqual(call(RNDownloadManager.download, mockRequesData.url, mockRequesData.headers, mockRequestConfig));
    return {reason: 'file://test.file'};
  });
});

describe('getInvoiceIos saga => success scenario', () => {
  const mockRequesData = {
    headers: {
      'Authorization': 'Basic 1234',
      'icard': '9876543',
      'msisdn': '0957590128'
    },
    url: 'http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf',
    invoiceNo: 1234
  };
  const it = sagaHelper(getInvoiceIos(mockRequesData));
  it('should make api call to validate pdf availability', (result) => {
    expect(result).toEqual(call(api, validatePdfAvailability(mockRequesData.invoiceNo)));
  });
  it('should navigate to webview with correct parameters', (result) => {
    const params = {
      url: mockRequesData.url,
      headers: mockRequesData.headers
    };
    expect(result).toEqual(put(NavigationActions.navigate({routeName: 'PackagePromoPage', params})));
  });
});

describe('getInvoiceIos saga => failure scenario', () => {
  const mockRequesData = {
    headers: {
      'Authorization': 'Basic 1234',
      'icard': '9876543',
      'msisdn': '0957590128'
    },
    url: 'http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf',
    invoiceNo: 1234
  };
  const it = sagaHelper(getInvoiceIos(mockRequesData));
  it('should make api call to validate pdf availability', (result) => {
    expect(result).toEqual(call(api, validatePdfAvailability(mockRequesData.invoiceNo)));
    return new Error({message: 'download failed'});
  });
  it('should show toast on failed pdf availability', (result) => {
    expect(result).toEqual(call(Toast.show, translate('BILLS_USAGE_PDF_DOWNLOAD_FAIL'), Toast.LONG));
  });
});
