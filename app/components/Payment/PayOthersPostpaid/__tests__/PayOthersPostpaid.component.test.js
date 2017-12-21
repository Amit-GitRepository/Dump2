import PayOthersPostpaid from '../PayOthersPostpaid.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('PayOthersPostpaid component', () => {
  it('renders correctly', () => {
    const mockProduct = {
      productId: '1234567890'
    };
    const component = renderer.create(<PayOthersPostpaid product={mockProduct} serviceNo='1234567890'/>);
    expect(component).toMatchSnapshot();
  });
});
