import IconTextInput from '../IconTextInput.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('IconTextInput component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<IconTextInput/>);
    const component = renderer.create(<IconTextInput />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
  it('renders correctly with icon', () => {
    const wrapper = shallow(<IconTextInput iconName='trueid'/>);
    expect(wrapper).toBeDefined();
  });
});
