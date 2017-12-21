import getStore from '../../../redux/store';
import PaymentStatusPage, {mapDispatchToProps, mapStateToProps} from '../PaymentStatus.page';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();
const dispatch = jest.fn();

describe(('PaymentStatusPage'), () => {
  it('renders ', () => {
    const wrapper = shallow(<PaymentStatusPage store={store}/>);
    expect(wrapper).toBeDefined();
  });
});

describe(('PaymentStatusPage: mapStateToProps'), () => {
  const props = mapStateToProps(store.getState());
  it('paymentStatus prop to be defined', () => {
    expect(props.paymentStatus).toBeDefined();
  });
});

describe(('PaymentStatusPage: mapDispatchToProps'), () => {
  const props = mapDispatchToProps(dispatch);
  it('goToScreen prop to be defined', () => {
    expect(props.goToScreen).toBeDefined();
  });
});
