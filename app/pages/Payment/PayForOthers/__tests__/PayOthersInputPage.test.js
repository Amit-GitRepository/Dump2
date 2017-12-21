import getStore from '../../../../redux/store';
import PayOthersInputPage, {mapDispatchToProps} from '../PayOthersInput.page';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();
const dispatch = jest.fn();

describe('PayforothersPostpaid page', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<PayOthersInputPage store={store}/>);
    expect(wrapper).toBeDefined();
  });
});

describe(('payForOthersInput page mapDispatchToProps'), () => {
  const props = mapDispatchToProps(dispatch);
  it('goToScreen prop to be defined', () => {
    expect(props.fetchPaymentProducts).toBeDefined();
  });
});