import getStore from '../../../redux/store';
import PreLoginPayBill, {mapDispatchToProps, mapStateToProps} from '../PreLoginPayBill.page';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();
const dispatch = jest.fn();

describe(('PreLoginPayBillPage'), () => {
  it('renders ', () => {
    const wrapper = shallow(<PreLoginPayBill store={store}/>);
    expect(wrapper).toBeDefined();
  });
});

describe(('PreLoginPayBillPage: mapStateToProps'), () => {
  const props = mapStateToProps(store.getState());
  it('productList prop to be defined', () => {
    expect(props.productList).toBeDefined();
  });
  it('productDetail prop to be defined', () => {
    expect(props.productDetail).toBeDefined();
  });
  it('billDetail prop to be defined', () => {
    expect(props.billDetail).toBeDefined();
  });
});

describe(('PreLoginPayBillPage: mapDispatchToProps'), () => {
  const props = mapDispatchToProps(dispatch);
  it('goToScreen prop to be defined', () => {
    expect(props.goToScreen).toBeDefined();
  });
  it('getProduct prop to be defined', () => {
    expect(props.getProduct).toBeDefined();
  });
  it('getProductBillDetails prop to be defined', () => {
    expect(props.getProductBillDetails).toBeDefined();
  });
  it('toggleProductCheck prop to be defined', () => {
    expect(props.toggleProductCheck).toBeDefined();
  });
  it('toggleProductCollapse prop to be defined', () => {
    expect(props.toggleProductCollapse).toBeDefined();
  });
  it('setPaymentItems prop to be defined', () => {
    expect(props.setPaymentItems).toBeDefined();
  });
});
