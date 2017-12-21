import getStore from '../../../../redux/store';
import PayForOthersTopUpPage, {mapDispatchToProps, mapStateToProps} from '../PayForOthersPostpaid.page';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();
const dispatch = jest.fn();

describe('PayForOthersTopUp page', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<PayForOthersTopUpPage store={store}/>);
    expect(wrapper).toBeDefined();
  });
});

describe('PayForOthersTopUp page maptateToProps', () => {
  const props = mapStateToProps(store.getState());
  it('should contain the prop product', () => {
    expect(props.product).toBeDefined();
  });  
});

describe(('PayForOthersTopUpPage mapDispatchToProps'), () => {
  const props = mapDispatchToProps(dispatch);
  it('goToScreen prop to be defined', () => {
    expect(props.goToScreen).toBeDefined();
  });
});
