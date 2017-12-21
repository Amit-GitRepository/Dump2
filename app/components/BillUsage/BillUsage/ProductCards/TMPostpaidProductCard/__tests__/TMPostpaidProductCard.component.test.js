import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import TMPostpaidProductCard from '../TMPostpaidProductCard.component'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('TMPostpaidProductCard component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<TMPostpaidProductCard />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('should shallow render with default props', () => {
    const wrapper = shallow(<TMPostpaidProductCard />);
    expect(wrapper).toBeDefined();
  });
});

describe('onBillToggle function', () => {
  it('should set the totalAmount in state to the sum of all due bills', () => {
    const mockBill = {
      invoiceNo: '1234',
      dueDate: '2018-04-04T00:00:00.000+07:00',
      billAmount: 2461,
      unpaidAmount: 1230.5,
      invoiceStatus: 'O',
      invoiceCycle: '10/3/2018',
      isChecked: true
    };
    const mockDueBills = [
      {
        invoiceNo: '1234',
        dueDate: '2018-04-04T00:00:00.000+07:00',
        billAmount: 2461,
        unpaidAmount: 1230.5,
        invoiceStatus: 'O',
        invoiceCycle: '10/3/2018',
        isChecked: true
      }
    ];
    const wrapper = shallow(<TMPostpaidProductCard amount={200} dueBills = {mockDueBills} />);
    const instance = wrapper.instance();
    instance.onBillToggle(mockBill)(true);
    expect(instance.state.totalAmount).toEqual(1430.5);
  });
});

