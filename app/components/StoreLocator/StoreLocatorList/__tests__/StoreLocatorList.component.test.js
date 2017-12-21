import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import StoreLocatorList from '../StoreLocatorList.component';

describe('StoreLocatorList component', () => {
  it('should render correctly', () => {
    const componentTree = renderer.create(<StoreLocatorList />).toJSON();
    expect(componentTree).toMatchSnapshot();
  });
});
