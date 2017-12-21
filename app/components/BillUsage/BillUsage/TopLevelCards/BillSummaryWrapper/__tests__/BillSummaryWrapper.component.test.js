import BillSummaryWrapper from '../BillSummaryWrapper.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const productList = {
  'tmhPostpaid': [
    {
      'accountId': '10100949',
      'balance': 20.0,
      'productId': '0968730312',
      'statusCode': 'A',
      'checkedBillSum': 20.0,
      'isChecked': true
    }
  ],
  'tol': [
    {
      'accountId': '10100940',
      'productId': 'Speed50M',
      'balance': 1500.0,
      'statusCode': 'A',
      'checkedBillSum': 1500,
      'isChecked': false
    }
  ],
  'tvs': [
    {
      'accountId': '10100941',
      'productId': 'Gold',
      'balance': 700.0,
      'statusCode': 'A',
      'checkedBillSum': 700.0,
      'isChecked': true
    }
  ]
};

describe('BillSummaryWrapper component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<BillSummaryWrapper productList={productList}/>).toJSON();
    expect(component).toMatchSnapshot();
  });
});
describe('calculateTotalAmount', () => {
  it('should calculateTotalAmount properly ', () => {
    const wrapper = shallow(<BillSummaryWrapper productList={productList}/>);
    const totalValue = wrapper.instance().calculateTotalAmount();
    expect(totalValue).toBe(720.0);
  });
});

describe('navigateToPayments', () => {
  it('should navigate to payment options screen', () => {
    const wrapper = shallow(<BillSummaryWrapper productList={productList} goToScreen={jest.fn()}/>);
    wrapper.instance().navigateToPayments();
    expect(wrapper.instance().props.goToScreen).toHaveBeenLastCalledWith('Payment');
  });
});
