import EBillItem from '../EBillItem.component';
import React from 'react';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16

describe('EBillItem component', () => {
  it('renders correctly with SMS option', () => {
    const component = renderer.create(<EBillItem
      accountType='True Vision'
      productId='9876543210'
      billingFormat='SMS'
      ebillValue='9876543210'
    />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
