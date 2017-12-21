import Button from '../Button.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('Button component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Button/>);
    const component = renderer.create(<Button />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
  it('renders correctly with icon', () => {
    const wrapper = shallow(<Button iconName='trueid'/>);
    expect(wrapper).toBeDefined();
  });
});
