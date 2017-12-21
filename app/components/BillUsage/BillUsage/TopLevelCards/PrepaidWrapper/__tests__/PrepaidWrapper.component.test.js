import PrepaidWrapper from '../PrepaidWrapper.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter'; // Enzyme adapter for React 16
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('PrepaidWrapper component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<PrepaidWrapper />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('should shallow render with default props', () => {
    const wrapper = shallow(<PrepaidWrapper />);
    expect(wrapper).toBeDefined();
  });
  it('should have initial state for amount and selectedPhoneNumber ', () => {
    const wrapper = shallow(<PrepaidWrapper />);
    expect(wrapper.state().selectedPhoneNumber).toBe('');
    expect(wrapper.state().amount).toBe(0);
  });
  it('should have update the state on radioSelect ', () => {
    const wrapper = shallow(<PrepaidWrapper />);
    wrapper.instance().onRadioSelect('0000-0000')();
    expect(wrapper.state().selectedPhoneNumber).toBe('0000-0000');
  });
  it('should have update the state on radioGroupSelect ', () => {
    const wrapper = shallow(<PrepaidWrapper />);
    wrapper.instance().onRadioGroupSelect(123);
    expect(wrapper.state().amount).toBe(123);
  });
});
