import ExtraPackageRow from '../ExtraPackageRow.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16
import {configure} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('ExtraPackageRow component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<ExtraPackageRow />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
