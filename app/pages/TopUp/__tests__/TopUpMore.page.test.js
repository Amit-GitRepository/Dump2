import getStore from '../../../redux/store';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import TopUpMorePage, {mapDispatchToProps, mapStateToProps} from '../TopUpMore.page';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();
const dispatch = jest.fn();

describe(('TopUpMorePage'), () => {
  it('renders ', () => {
    const wrapper = shallow(<TopUpMorePage store={store}/>);
    expect(wrapper).toBeDefined();
  });
});

describe(('TopUpMorePage: mapStateToProps'), () => {
  const props = mapStateToProps(store.getState());
  it('paymentItems prop to be defined', () => {
    expect(props.paymentItems).toBeDefined();
  });
});

describe(('TopUpMorePage: mapDispatchToProps'), () => {
  const props = mapDispatchToProps(dispatch);
  it('setPaymentItems prop to be defined', () => {
    expect(props.setPaymentItems).toBeDefined();
  });
  it('goToScreen prop to be defined', () => {
    expect(props.goToScreen).toBeDefined();
  });
});
