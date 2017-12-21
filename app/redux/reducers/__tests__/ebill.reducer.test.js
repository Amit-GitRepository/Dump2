import ebill from '../ebill.reducer';
import * as actions from '../../actions/index.actions';

describe('Ebill reducer', () => {
  const initialState = {
    billPreference: {
      PAPER: [],
      EMAIL: [],
      SMS: []
    }
  };
  // check for immutable object
  Object.freeze(initialState);
  it('should have the initial value', () => {
    expect(ebill(undefined, {})).toEqual(initialState);
  });
  it('should set bill preferences which is merging of product list data and bill preferences api res', () => {
    const mergedBillPreference = {
      'PAPER': [
        {
          'accountId': '10100949',
          'billingFormat': 'PAPER',
          'billingValue': {
            'country': '',
            'zipCode': '10170',
            'roomNo': '',
            'city': 'กรุงเทพมหานคร',
            'addressType': 'I',
            'moo': '',
            'soi': 'ซอยพุทธมณฑลสาย 2 ซอย 24',
            'building': '',
            'street': '-',
            'district': 'เขตทวีวัฒนา',
            'addressLine1': '11/9 * * ซอยพุทธมณฑลสาย 2 ซอย 24 *',
            'houseNo': '11/9',
            'addressLine2': '* * * * -',
            'timeAtAddress': '0101',
            'addressLine3': '* แขวงศาลาธรรมสพน์ * เขตทวีวัฒนา',
            'addressLine4': 'กรุงเทพมหานคร 10170',
            'floor': '',
            'subDistrict': 'แขวงศาลาธรรมสพน์'
          },
          'productId': '0968730312',
          'subscriberId': '193510',
          'balance': '0.0',
          'subscriptionType': 'POSTPAID',
          'statusCode': 'ACTIVE',
          'productType': 'TrueMoveH',
          'accountType': 'tmhPostpaid'
        }
      ],
      'SMS': [
        {
          'accountId': '10101029',
          'billingFormat': 'SMS',
          'billingValue': '0855469856',
          'productId': '0968730313',
          'subscriberId': '193591',
          'balance': '0.0',
          'subscriptionType': 'POSTPAID',
          'statusCode': 'ACTIVE',
          'productType': 'TrueMoveH',
          'accountType': 'tmhPostpaid'
        }
      ],
      EMAIL: []
    };
    const testAction = {
      type: actions.SET_BILL_PREFERENCE,
      payload: mergedBillPreference
    };

    const state = {
      ...initialState
    };
    const result = {
      ...initialState,
      billPreference: mergedBillPreference
    };
    expect(ebill(state, testAction)).toEqual(result);
  });
});
