import getStore from '../../../redux/store';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import TopUpPage, {mapDispatchToProps, mapStateToProps} from '../TopUp.page';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();
const dispatch = jest.fn();

describe(('TopUpPage'), () => {
  it('renders ', () => {
    const wrapper = shallow(<TopUpPage store={store}/>);
    expect(wrapper).toBeDefined();
  });
});

describe(('TopUpPage: mapStateToProps'), () => {
  const props = mapStateToProps(store.getState());
  it('tmhPrepaid prop to be defined', () => {
    expect(props.tmhPrepaid).toBeDefined();
  });
});

describe(('TopUpPage: mapDispatchToProps'), () => {
  const props = mapDispatchToProps(dispatch);
  it('setPaymentItems prop to be defined', () => {
    expect(props.setPaymentItems).toBeDefined();
  });
  it('goToScreen prop to be defined', () => {
    expect(props.goToScreen).toBeDefined();
  });
});
