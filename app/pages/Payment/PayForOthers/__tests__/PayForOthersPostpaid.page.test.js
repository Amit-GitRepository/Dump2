import getStore from '../../../../redux/store';
import PayforothersPostpaidPage, {mapDispatchToProps, mapStateToProps} from '../PayForOthersPostpaid.page';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();
const dispatch = jest.fn();

describe('PayforothersPostpaid page', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<PayforothersPostpaidPage store={store}/>);
    expect(wrapper).toBeDefined();
  });
});

describe('PayforothersPostpaid page maptateToProps', () => {
  const props = mapStateToProps(store.getState());
  it('should contain the prop product', () => {
    expect(props.product).toBeDefined();
  });  
});

describe(('PayforothersPostpaid mapDispatchToProps'), () => {
  const props = mapDispatchToProps(dispatch);
  it('goToScreen prop to be defined', () => {
    expect(props.goToScreen).toBeDefined();
  });
});
