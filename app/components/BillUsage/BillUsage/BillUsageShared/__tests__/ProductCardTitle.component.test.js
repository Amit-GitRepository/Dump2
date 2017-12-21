import ProductCardTitle from '../ProductCardTitle/ProductCardTitle.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16

describe('ProductCardTitle component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<ProductCardTitle />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
