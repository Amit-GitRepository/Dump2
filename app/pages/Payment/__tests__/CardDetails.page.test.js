import CardDetailsPage, {mapDispatchToProps, mapStateToProps} from '../CardDetails.page';
import getStore from '../../../redux/store';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();
const dispatch = jest.fn();

describe(('CardDetailsPage'), () => {
  it('renders ', () => {
    const wrapper = shallow(<CardDetailsPage store={store}/>);
    expect(wrapper).toBeDefined();
  });
});

describe(('CardDetailsPage: mapStateToProps'), () => {
  const props = mapStateToProps(store.getState());
  it('paymentItems prop to be defined', () => {
    expect(props.paymentItems).toBeDefined();
  });
  it('savedCards prop to be defined', () => {
    expect(props.savedCards).toBeDefined();
  });
});

describe(('CardDetailsPage: mapDispatchToProps'), () => {
  const props = mapDispatchToProps(dispatch);
  it('payForExistingCustomer prop to be defined', () => {
    expect(props.payForExistingCustomer).toBeDefined();
  });
  it('payForNewCustomer prop to be defined', () => {
    expect(props.payForNewCustomer).toBeDefined();
  });
  it('preLoginPayment prop to be defined', () => {
    expect(props.preLoginPayment).toBeDefined();
  });
  it('showPaymentMethods prop to be defined', () => {
    expect(props.showPaymentMethods).toBeDefined();
  });
});
