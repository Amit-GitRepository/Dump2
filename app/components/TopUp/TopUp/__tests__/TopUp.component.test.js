import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import TopUp from '../TopUp.component'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('TopUp component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TopUp/>);
    const component = renderer.create(<TopUp />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
  it('should have initial state for amount and selectedPhoneNumber ', () => {
    const wrapper = shallow(<TopUp />);
    expect(wrapper.state().msisdn).toBe(null);
    expect(wrapper.state().value).toBe(null);
  });
  it('should update the state on setTopUpMsisdn ', () => {
    const wrapper = shallow(<TopUp />);
    wrapper.instance().setTopUpMsisdn('9999');
    expect(wrapper.state().msisdn).toBe('9999');
  });
  it('should update the state on setTopUpValue ', () => {
    const wrapper = shallow(<TopUp />);
    wrapper.instance().setTopUpValue('123');
    expect(wrapper.state().value).toBe(123);
  });
});
