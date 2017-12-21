import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import TopUpMore from '../TopUpMore.component'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('TopUpMore component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TopUpMore/>);
    const component = renderer.create(<TopUpMore />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
  it('should update the state on validateTopUpValue to true', () => {
    const wrapper = shallow(<TopUpMore />);
    wrapper.instance().validateTopUpValue(123);
    expect(wrapper.state().errorTopUpValue).toBe(true);
  });
  it('should update the state on validateTopUpValue to false', () => {
    const wrapper = shallow(<TopUpMore />);
    wrapper.instance().validateTopUpValue(120);
    expect(wrapper.state().errorTopUpValue).toBe(false);
  });
  it('should setPaymentItems to payment options screen', () => {
    const paymentItems = [{
      msisdn: '1234',
      amount: 'more',
      service: 'tmhPrepaid'
    }];
    const wrapper = shallow(<TopUpMore paymentItems={paymentItems} goToScreen={jest.fn()} setPaymentItems={jest.fn()}/>);
    wrapper.instance().topUp();
    expect(wrapper.instance().props.setPaymentItems).toHaveBeenLastCalledWith([{
      msisdn: '1234',
      amount: 0,
      service: 'tmhPrepaid'
    }]);
    expect(wrapper.instance().props.goToScreen).toHaveBeenLastCalledWith('Payment');
  });
});
