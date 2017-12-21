import getStore from '../../../redux/store';
import mapConfig from '../../../config/map.config';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import StoreLocatorMapPage, {mapDispatchToProps, mapStateToProps} from '../StoreLocatorMap.page';
import {changeCurrentLocation} from '../../../redux/actions/index.actions';
import {configure, shallow} from 'enzyme';
import {getCurrentPosition, sortByDistance} from '../../../utils/location.util';

const store = getStore({
  storeLocator: {
    radiusKM: 50,
    allStores: {data: []}
  },
  user: {
    currentLocation: null
  }
});
jest.mock('../../../utils/location.util');

configure({adapter: new ReactSixteenAdapter()});

describe(('StoreLocatorMap Page'), () => {
  let wrapper;
  let page;
  beforeEach(() => {
    wrapper = shallow(<StoreLocatorMapPage currentLocation={{}} store={store}/>);
    page = wrapper.find('StoreLocatorMapPage').shallow();
  });
  it('renders ', () => {
    expect(wrapper).toBeDefined();
  });

  it('it has mapStateToProps : props defined', () => {
    const props = mapStateToProps(store.getState());
    expect(props.currentLocation).toBeDefined();
  });

  it('it has mapDispatchToProps functions', () => {
    const mockDispatch = (action) => action;
    const props = mapDispatchToProps(mockDispatch);
    expect(props.changeCurrentLocation({latitude: 1.8978, longitude: 2.7568})).toEqual(changeCurrentLocation({latitude: 1.8978, longitude: 2.7568}));
  });

  it('componentWillMount: should call getCurrentPosition', () => {
    page.setState({initialRegion: null});
    page.instance().componentWillMount();
    expect(getCurrentPosition).toBeCalled();
  });
  it('componentWillMount: should call getCurrentPosition', async () => {
    page.setState({initialRegion: {latitude: 1.8978, longitude: 2.7568}});
    getCurrentPosition.mockImplementation(() => Promise.reject());
    const updateMapSpy = jest.spyOn(page.instance(), 'updateMap');
    await page.instance().componentWillMount();
    expect(getCurrentPosition).toBeCalled();
    expect(updateMapSpy).toBeCalledWith({latitude: 1.8978, longitude: 2.7568}, true);
  });
  it('componentWillMount: should updateMap if props.selectedProvince is passed', () => {
    page.setProps({selectedProvince: {lat: 10, long: 100}});
    page.instance().componentWillMount();
    expect(page.instance().state.initialRegion).toEqual({...mapConfig.defaultZoom.province, 'latitude': 10, 'longitude': 100});
  });
  it('showSearchModal: should showSearchModal', () => {
    page.setState({searchModalVisibility: false});
    page.instance().showSearchModal();
    expect(page.instance().state.searchModalVisibility).toEqual(true);
  });
  it('hideSearchModal: should hideSearchModal', () => {
    page.setState({searchModalVisibility: true});
    page.instance().hideSearchModal();
    expect(page.instance().state.searchModalVisibility).toEqual(false);
  });
  it('onSearchTextChange: should call props.changeSearchText with input and language', () => {
    const props = {changeSearchText: jest.fn(), language: 'th'};
    page.setProps(props);
    page.instance().onSearchTextChange('Pattaya');
    expect(props.changeSearchText).toBeCalledWith({input: 'Pattaya', language: 'th'});
  });
  it('addStoreMarker: should return if lat or long is not there', () => {
    const store = {latitude: null};
    expect(page.instance().addStoreMarker(store)).toBeUndefined();
  });
  it('addStoreMarker: should add marker and updateNearByStores', () => {
    const store = {latitude: 12, longitude: 100};
    const props = {updateNearByStores: jest.fn(), clearFilteredStores: jest.fn()};
    const hideSearchModalSpy = jest.spyOn(page.instance(), 'hideSearchModal');
    // mocking implementation of sortByDistance
    sortByDistance.mockImplementation((obj) => ([{...obj, distance: 1.0}]));
    page.setProps(props);
    page.setState({initialRegion: {latitude: 12, longitude: 100}});
    page.instance().addStoreMarker(store);
    expect(props.updateNearByStores).toBeCalledWith([{...store, distance: 1}]);
    expect(props.clearFilteredStores).toBeCalled();
    expect(hideSearchModalSpy).toBeCalled();
    expect(page.instance().state.initialRegion.latitude).toEqual(12);
    expect(page.instance().state.initialRegion.longitude).toEqual(100);
  });

  it('updateMap: should call updateNearByStores when the coordinates are passed', () => {
    page.setProps({updateNearByStores: jest.fn()});
    page.setState({initialRegion: null});
    page.instance().updateMap({'latitude': 13.752725,
      'longitude': 100.502518});
    expect(page.instance().props.updateNearByStores).toBeCalled();
  });

  it('onPressCurrLocation: should call updateKMRadius if the radius value is different', () => {
    page.setProps({updateKMRadius: jest.fn()});
    page.setState({initialRegion: null});
    page.instance().onPressCurrLocation();
    expect(page.instance().props.updateKMRadius).toBeCalled();
  });
  it('showSearchModal: should show modal', () => {
    page.setProps({updateKMRadius: jest.fn()});
    page.setState({initialRegion: null});
    page.instance().onPressCurrLocation();
    expect(page.instance().props.updateKMRadius).toBeCalled();
  });
  it('componentWillReceiveProps: should not update initialRegion in state when selectedProvince prop is not changed', () => {
    const props = {
      selectedProvince: {'latitude': 19, 'longitude': 56}
    };
    page.setProps(props);
    page.setState({initialRegion: null});
    page.instance().componentWillReceiveProps(props);
    expect(page.instance().state.initialRegion).toEqual(null);
  });
  it('componentWillReceiveProps: should update initialRegion in state when selectedProvince prop is changed', () => {
    const props = {
      selectedProvince: {'lat': 2, 'long': 4}
    };
    const newProps = {
      selectedProvince: {'lat': 19, 'long': 56}
    };
    page.setProps(props);
    page.instance().componentWillReceiveProps(newProps);
    expect(page.instance().state.initialRegion).toEqual({...mapConfig.defaultZoom.province, 'latitude': 19, 'longitude': 56});
  });
});
