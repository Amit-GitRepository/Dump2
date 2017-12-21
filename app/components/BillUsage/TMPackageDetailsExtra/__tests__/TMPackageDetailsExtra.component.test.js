import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import TMPackageDetailsExtra from '../TMPackageDetailsExtra.component'; // Enzyme adapter for React 16
import {configure} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('TMPackageDetailsExtra component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<TMPackageDetailsExtra />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
