import getStore from '../../../redux/store';
import PaymentStatusDetailsPage, {mapStateToProps} from '../PaymentStatusDetails.page';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();

describe(('PaymentStatusDetailsPage'), () => {
  it('renders ', () => {
    const wrapper = shallow(<PaymentStatusDetailsPage store={store}/>);
    expect(wrapper).toBeDefined();
  });
});

describe(('PaymentStatusDetailsPage: mapStateToProps'), () => {
  const props = mapStateToProps(store.getState());
  it('paymentStatus prop to be defined', () => {
    expect(props.paymentDetails).toBeDefined();
  });
});
