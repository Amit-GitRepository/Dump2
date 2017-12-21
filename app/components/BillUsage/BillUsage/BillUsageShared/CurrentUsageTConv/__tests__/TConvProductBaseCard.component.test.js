import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter'; // Enzyme adapter for React 16
import renderer from 'react-test-renderer';
import TConvProductBaseCard from '../TConvProductBaseCard.component';
import {configure} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});
describe('TConvProductBaseCard component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<TConvProductBaseCard product={{productId: '90420222'}}/>).toJSON();
    expect(component).toMatchSnapshot();
  });
});
