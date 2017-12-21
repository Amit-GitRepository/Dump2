import CircleShadowSeparator from '../CircleShadowSeparator.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('CircleShadowSeparator component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<CircleShadowSeparator />);
    const component = renderer.create(<CircleShadowSeparator />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
  it('renders correctly', () => {
    const wrapper = shallow(<CircleShadowSeparator/>);
    expect(wrapper).toBeDefined();
  });
});
