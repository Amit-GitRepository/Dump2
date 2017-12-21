import getStore from '../../../redux/store';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import StoreLocatorTabsPage, {mapDispatchToProps, mapStateToProps} from '../StoreLocatorTabs.page';
import {configure, shallow} from 'enzyme';

const store = getStore({
  user: {language: 'en'},
  storeLocator: {selectedProvince: {
    'name': {
      'en': 'Bangkok',
      'th': 'กรุงเทพ'
    },
    'latitude': 13.752725,
    'longitude': 100.502518
  }}
});
configure({adapter: new ReactSixteenAdapter()});

describe(('StoreLocatorMap Page'), () => {

  it('renders ', () => {
    const wrapper = shallow(<StoreLocatorTabsPage store={store}/>);
    expect(wrapper).toBeDefined();
  });

  it('it has mapStateToProps : props defined', () => {
    const props = mapStateToProps(store.getState());
    expect(props.radiusKM).toBeDefined();
    expect(props.language).toBeDefined();
    // expect(props.nearByStores).toBeDefined(); //TODO has to be checked if this is even needed
    expect(props.selectedProvince).toBeDefined();
    expect(props.currentLocation).toBeDefined();
  });

  it('it has mapDispatchToProps functions', () => {
    const mockDispatch = (action) => action;
    const props = mapDispatchToProps(mockDispatch);
    expect(props.onMapClick).toBeDefined();
    expect(props.onListClick).toBeDefined();
    expect(props.selectProvince).toBeDefined();
    expect(props.selectService).toBeDefined();
  });

  it('selectService: should call the props.selectService', () => {
    const wrapper = shallow(<StoreLocatorTabsPage store={store}/>);
    const page = wrapper.find('StoreLocatorTabsPage').shallow();
    page.setProps({selectService: jest.fn()});
    page.instance().selectService('Payment');
    expect(page.instance().props.selectService).toHaveBeenCalled();
  });

  it('selectProvince: should call the props.selectProvince', () => {
    const wrapper = shallow(<StoreLocatorTabsPage store={store}/>);
    const page = wrapper.find('StoreLocatorTabsPage').shallow();
    page.setProps({selectProvince: jest.fn()});
    page.instance().selectProvince('Bangkok');
    expect(page.instance().props.selectProvince).toHaveBeenCalled();
  });

});
