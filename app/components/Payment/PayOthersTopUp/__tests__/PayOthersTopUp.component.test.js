import PayOtherTopUp from '../PayOthersTopUp.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('PayOtherTopUp component', () => {
  it('renders correctly', () => {
    const mockProduct = {
      productId: '1234567890'
    };
    const component = renderer.create(<PayOtherTopUp product={mockProduct} serviceNo='1234567890'/>);
    expect(component).toMatchSnapshot();
  });
});
