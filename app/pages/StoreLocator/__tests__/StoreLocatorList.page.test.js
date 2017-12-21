import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import StoreLocatorListPage, {mapDispatchToProps, mapStateToProps} from '../StoreLocatorList.page';
import {configure, shallow} from 'enzyme';
import {createStore} from 'redux';
import {NavigationActions} from 'react-navigation';
import {Provider} from 'react-redux';
import {translate} from '../../../language/i18n/helper';

configure({adapter: new ReactSixteenAdapter()});

jest.mock('../../../utils/location.util.js');
jest.mock('../../../config/storeInfo.config.js', () => (({
  data: [{
    latitude: '1',
    longitude: '2'
  }]
})));

const store = createStore(() => ({}));

describe('StoreLocatorListPage page', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <StoreLocatorListPage />
      </Provider>);
    expect(wrapper).toBeDefined();
  });
  it('mapStateToProps: should return nearByStores with subheading and updated name', () => {
    const state = {storeLocator: {
      nearByStores: [
        {name: {'en': 'someStoreNameEn'}, distance: 1.1},
        {name: {'th': 'someStoreNameTh'}, distance: 1.1}
      ], radiusKM: 15}, user: {language: 'th'}};
    const subheading = translate('STORE_LOCATOR__DETAILS_DISTANCE') + ' ' + translate('STORE_LOCATOR__DETAILS_DISTANCE_VAL', {distance: '1.1'});
    const expected = {nearByStores: [
      {name: {'en': 'someStoreNameEn'}, storeName: 'someStoreNameEn', distance: 1.1, subheading},
      {name: {'th': 'someStoreNameTh'}, storeName: 'someStoreNameTh', distance: 1.1, subheading}
    ], radiusKM: 15};
    expect(mapStateToProps(state)).toEqual(expected);
  });

  it('mapDispatchToProps: onStorePress =>  should navigate to StoreDetails with storedate passing as navparams', () => {
    const mockDispatch = jest.fn();
    const dummyStoreData = {name: 'someStoreName'};
    const {onStorePress} = mapDispatchToProps(mockDispatch);
    const storePressHandler = onStorePress(dummyStoreData);
    storePressHandler();
    expect(mockDispatch).toHaveBeenCalledWith(NavigationActions.navigate({routeName: 'StoreDetails', params: dummyStoreData}));
  });
});
