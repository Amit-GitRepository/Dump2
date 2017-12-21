import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import StoreLocatorTab from '../StoreLocatorTab.component';
import {configure} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('StoreLocatorTab component', () => {

  it('should render correctly', () => {
    const componentTree = renderer.create(<StoreLocatorTab selectProvince={jest.fn()} />).toJSON();
    expect(componentTree).toMatchSnapshot();
  });
});
