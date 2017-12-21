import EBillAdd from '../EBillAdd.component';
import React from 'react';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16

describe('EBillAdd component', () => {
  it('renders correctly', () => {
    const paperBillContent = {
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
      'accountId': '10100949',
      'balance': '0.0',
      'subscriptionType': 'POSTPAID',
      'statusCode': 'ACTIVE',
      'productType': 'TrueMoveH',
      'accountType': 'tmhPostpaid'
    };
    const component = renderer.create(<EBillAdd paperBillContent={paperBillContent} />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
