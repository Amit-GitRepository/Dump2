import RadioButton from '../RadioButton.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('TopUpRadioButton component', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <RadioButton onRadioSelect={jest.fn()}/>).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('renders correctly Radio button with the props', () => {
    const wrapper = shallow(<RadioButton onRadioSelect={jest.fn()}/>);
    expect(wrapper).toBeDefined();
  });
  it('onClick should callback to radioSelect', () => {
    const wrapper = shallow(<RadioButton onRadioSelect={jest.fn()} index={1} value='0000-0000' isSelected={true}/>);
    wrapper.instance().onClick();
    expect(wrapper.instance().props.onRadioSelect).toHaveBeenCalledWith('0000-0000', true);
  });
  it('onClick should callback to radioSelect func with value and isSelected', () => {
    const wrapper = shallow(<RadioButton onRadioSelect={jest.fn()} index={1} value='0000-0000' isSelected={false}/>);
    wrapper.instance().onClick();
    const props = wrapper.instance().props;
    expect(props.onRadioSelect).toHaveBeenLastCalledWith(props.value, props.isSelected);
  });
});
