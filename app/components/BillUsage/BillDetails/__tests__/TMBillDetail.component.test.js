import React from 'react';
import renderer from 'react-test-renderer';
import TMBillDetail from '../TMBillDetail.component'; // Enzyme adapter for React 16

describe('TMBillDetail component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<TMBillDetail />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
