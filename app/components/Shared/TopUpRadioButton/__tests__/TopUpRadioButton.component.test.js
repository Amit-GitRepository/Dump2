import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import TopUpRadioButton from '../TopUpRadioButton.component';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('TopUpRadioButton component', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <TopUpRadioButton label='First' value='1' index={0} radioSelect={jest.fn()}/>).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('renders correctly Radio button with the props', () => {
    const wrapper = shallow(<TopUpRadioButton label='First' value='1' index={0} radioSelect={jest.fn()}/>);
    expect(wrapper).toBeDefined();
  });
  it('onToggle should callback to radioSelect func', () => {
    const wrapper = shallow(<TopUpRadioButton label='First' value='1' index={0} radioSelect={jest.fn()}/>);
    wrapper.instance().onToggle();
    expect(wrapper.instance().props.radioSelect).toHaveBeenCalled();
  });
  it('onToggle should callback to radioSelect func with value', () => {
    const wrapper = shallow(<TopUpRadioButton label='First' value='1' index={0} radioSelect={jest.fn()}/>);
    wrapper.instance().onToggle();
    const props = wrapper.instance().props;
    expect(wrapper.instance().props.radioSelect).toHaveBeenCalled();
    expect(props.radioSelect).toHaveBeenLastCalledWith(props.value);
  });
});
