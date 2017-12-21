import getStore from '../../../redux/store';
import PaymentOptionsPage, {mapDispatchToProps, mapStateToProps} from '../PaymentOptions.page';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();
const dispatch = jest.fn();

describe(('PaymentOptionsPage'), () => {
  it('renders ', () => {
    const wrapper = shallow(<PaymentOptionsPage store={store}/>);
    expect(wrapper).toBeDefined();
  });
});

describe(('PaymentOptionsPage: mapStateToProps'), () => {
  const props = mapStateToProps(store.getState());
  it('paymentItems prop to be defined', () => {
    expect(props.paymentItems).toBeDefined();
  });
});

describe(('PaymentOptionsPage: mapDispatchToProps'), () => {
  const props = mapDispatchToProps(dispatch);
  it('goToScreen prop to be defined', () => {
    expect(props.goToScreen).toBeDefined();
  });
});
