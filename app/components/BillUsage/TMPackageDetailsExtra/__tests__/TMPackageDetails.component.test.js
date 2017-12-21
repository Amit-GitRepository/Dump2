import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import TMPackageDetails from '../TMPackageDetails.component'; // Enzyme adapter for React 16
import {configure} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('TMPackageDetails component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<TMPackageDetails />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
