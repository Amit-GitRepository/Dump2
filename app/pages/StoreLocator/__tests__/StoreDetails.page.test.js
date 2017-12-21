import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import set from 'lodash/set';
import StoreDetailsPage, {mapDispatchToProps} from '../StoreDetails.page';
import {configure, shallow} from 'enzyme';
import {createStore} from 'redux';
import {NavigationActions} from 'react-navigation';
import {Provider} from 'react-redux';
import * as reactNative from '../../../utils/reactNative.util';

configure({adapter: new ReactSixteenAdapter()});

jest.mock('../../../config/storeInfo.config', () => ({data: [{
  id: 'storeID700',
  services: {}
}]}));

jest.mock('../../../utils/location.util.js');
jest.mock('../../../utils/reactNative.util.js', () => ({
  openUrl: jest.fn((url) => url),
  Platform: {OS: 'ios'}
}));

const store = createStore(() => ({user: {language: 'en'}}));

describe('StoreDetailsPage page', () => {
  let pageComponent = null; // StoreDetailsPage component
  const navigation = set({}, 'state.params', {});

  beforeEach(() => {
    navigation.state.params = {
      service: {'a': null, 'b': null},
      distance: 1,
      landmarks: {'en': 'someLandmark'},
      address: {'en': 'someAddress'},
      name: {
        'en': 'someName',
        'th': 'someName (th)'
      },
      latitude: 1,
      longitude: 1
    };
    set(navigation.state.params, 'contact.info.phonenumber', '123');
    set(navigation.state.params, 'id', 'storeID700');
    const wrapper = shallow(<StoreDetailsPage store={store} navigation={navigation} />);
    pageComponent =  wrapper.find('StoreDetailsPage').shallow();
  });

  it('should render', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <StoreDetailsPage />
      </Provider>);
    expect(wrapper).toBeDefined();
  });
  it('getDetails: should return store details', () => {
    const expectedDetails = {
      address: 'someAddress',
      services: ['a', 'b'],
      distance: 1,
      landmark: 'someLandmark',
      contact: '123',
      name: 'someName',
      id: 'storeID700'
    };
    const instance = pageComponent.instance();
    expect(instance.getDetails()).toEqual(expectedDetails);
  });
  it('getProducts: should return products for a service', () => {
    const instance = pageComponent.instance();
    const storeId = 'storeID700';
    const serviceName = 'ServiceTitle';
    const storesInfo = {};
    set(storesInfo, 'metaData.services.s0', 'Some ProductName');
    set(storesInfo, 'metaData.services.s123', 'Yet another ProductName');
    set(storesInfo, 'data[0].id', 'storeID700');
    set(storesInfo, 'data[0].service.ServiceTitle[0]', 's0');
    set(storesInfo, 'data[0].service.ServiceTitle[1]', 's123');
    const products = instance.getProducts(serviceName, storeId, storesInfo);
    expect(products).toEqual(['Some ProductName', 'Yet another ProductName']);
  });
  it('onServiceClick: should accept serviceName and call props.navigateToServiceDetails with required args', () => {
    const navigateToServiceDetails = jest.fn();
    pageComponent.setProps({navigateToServiceDetails});
    const instance = pageComponent.instance();
    instance.getProducts = jest.fn(() => ['p']);
    instance.onServiceClick('Payment Service')();
    const mockedStoreInfo = {data: [{
      id: 'storeID700',
      services: {}
    }]};
    const expected = {
      products: ['p'],
      serviceName: 'Payment'
    };
    expect(instance.getProducts).toHaveBeenCalledWith('Payment', 'storeID700', mockedStoreInfo);
    expect(navigateToServiceDetails).toHaveBeenCalledWith(expected);
  });
  it('mapDispatchToProps: serviceClickHandler => should navigate to ServiceDetails with servicename', () => {
    const mockDispatch = jest.fn();
    const {navigateToServiceDetails} = mapDispatchToProps(mockDispatch);
    const params = {products: [1]};
    navigateToServiceDetails(params);
    expect(mockDispatch).toHaveBeenCalledWith(NavigationActions.navigate({routeName: 'ServiceDetails', params}));
  });

  it('onCallClick: should link to native dialer', () => {
    const instance = pageComponent.instance();
    expect(instance.onCallClick()).toEqual('tel:123');
  });
  it('onGetDirectionClick: should call redirectToMaps with longitude and latitude and name', () => {
    const instance = pageComponent.instance();
    const spy = jest.spyOn(instance, 'redirectToMaps');
    instance.onGetDirectionClick();
    expect(spy).toHaveBeenCalledWith(1, 1, 'someName');
  });

  it('redirectToMaps: should redirect to ios maps when platform is ios', () => {
    const instance = pageComponent.instance();
    reactNative.Platform.OS = 'ios';

    expect(instance.onGetDirectionClick()).toEqual('http://maps.apple.com/?ll=1,1&q=someName');
  });

  it('redirectToMaps: should redirect to ios maps when platform is not ios', () => {
    const instance = pageComponent.instance();
    reactNative.Platform.OS = 'android';
    expect(instance.onGetDirectionClick()).toEqual('http://maps.google.com/maps?q=1,1&label=someName');
  });

  it('appendServiceText: Add Service text in each service of service list', () => {
    const initialDetails = {services: ['After Sales', 'Payment', 'Sale Product']};
    const finalDetails = {services: ['After Sales Service', 'Payment Service', 'Sale Product Service']};
    const instance = pageComponent.instance();
    expect(instance.appendServiceText(initialDetails)).toEqual(finalDetails);
  });

});
