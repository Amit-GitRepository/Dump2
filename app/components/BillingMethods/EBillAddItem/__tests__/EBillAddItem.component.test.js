import EBillAddItem from '../EBillAddItem.component';
import React from 'react';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16

describe('EBillAddItem component', () => {
  it('renders correctly with SMS option', () => {
    const component = renderer.create(<EBillAddItem
      accountType='True Online'
      productId='1234567'
      billingFormat='SMS'
    />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('renders correctly with EMAIL option', () => {
    const component = renderer.create(<EBillAddItem
      accountType='True Online'
      productId='1234567'
      billingFormat='EMAIL'
    />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('renders correctly with SMS and default msisdn option', () => {
    const component = renderer.create(<EBillAddItem
      accountType='TrueMove H Postpaid'
      productId='1234567890'
      defaultMSISDN='1234567890'
      billingFormat='SMS'
    />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
