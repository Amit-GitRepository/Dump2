import getStore from '../../../redux/store';
import Landing, {mapDispatchToProps, mapStateToProps} from '../Landing.page';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';
import {loginRequest, registerRequest} from '../../../redux/actions/index.actions';
import {NavigationActions} from 'react-navigation';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();

describe(('LandingPage'), () => {
  const mockServiceNo = '1234';
  it('renders ', () => {
    const wrapper = shallow(<Landing store={store}/>);
    expect(wrapper).toBeDefined();
  });

  it('it has mapStateToProps : props defined', () => {
    const props = mapStateToProps(store.getState());
    expect(props.msisdn).toBeDefined();
    expect(props.language).toBeDefined();
  });
  it('it has mapDispatchToProps functions', () => {
    const mockDispatch = (action) => action;
    const props = mapDispatchToProps(mockDispatch);
    expect(props.loginRequest()).toEqual(loginRequest(NavigationActions.navigate({routeName: 'BillUsage'})));
    expect(props.registerRequest()).toEqual(registerRequest(NavigationActions.navigate({routeName: 'BillUsage'})));
    expect(props.navigatePayBill(mockServiceNo)).toEqual({'actions': [{'routeName': 'PreLoginPayBill', 'type': 'Navigation/NAVIGATE', 'params': {'serviceNo': '1234'}}], 'index': 0, 'type': 'Navigation/RESET'});
  });
});
