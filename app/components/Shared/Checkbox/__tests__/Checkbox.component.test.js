import CheckBox from '../Checkbox.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('CheckBox component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<CheckBox />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('shallow render for checkbox correctly', () => {
    const wrapper = shallow(<CheckBox />);
    expect(wrapper).toBeDefined();
  });
  it('should call onChange callback', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<CheckBox onChange={onChange}/>);
    wrapper.instance().onClick();
    expect(wrapper.instance().props.onChange).toBeCalledWith(true, '');
  });
});
