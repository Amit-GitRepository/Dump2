import PaperBillItem from '../PaperBillItem.component';
import React from 'react';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16

describe('PaperBillItem component', () => {
  it('renders correctly with SMS option', () => {
    const component = renderer.create(<PaperBillItem
      accountType='True Online'
      productId='9876543210'
      billingAddress='444 Soi Ladprao 109, Ladprao rd., Bangkapi, Bangkok 10240'
    />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
