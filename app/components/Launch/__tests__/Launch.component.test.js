import Launch from '../Launch.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('Launch component', () => {
  const wrapper = shallow(<Launch/>);
  it('renders correctly', () => {
    const LaunchTree = renderer.create(<Launch />).toJSON();
    expect(LaunchTree).toMatchSnapshot();
  });
  it('renders correctly', () => {
    expect(wrapper).toBeDefined();
  });
});
