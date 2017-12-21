import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import TMExtraPackage from '../TMExtraPackage.component'; // Enzyme adapter for React 16
import {configure} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('TMExtraPackage component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<TMExtraPackage />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
