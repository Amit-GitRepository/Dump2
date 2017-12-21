import ComponentWithTab from '../../components/ComponentWithTab/ComponentWithTab.component';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import mapConfig from '../../config/map.config';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';
import result from 'lodash/result';
import StoreLocatorMap from '../../components/StoreLocator/StoreLocatorMap/StoreLocatorMap.component';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getCurrentPosition, sortByDistance} from '../../utils/location.util';
import {NavigationActions} from 'react-navigation';
import * as actions from '../../redux/actions/index.actions';

class StoreLocatorMapPage extends ComponentWithTab {
  state = {
    initialRegion: mapConfig.initialRegion,
    searchModalVisibility: false
  };

  showSearchModal = () => this.setState({searchModalVisibility: true})
  hideSearchModal = () => {
    this.props.clearFilteredStores();
    this.setState({searchModalVisibility: false});
  }

  onSearchTextChange = (newValue) => {
    const payload = {input: newValue, language: this.props.language};
    this.props.changeSearchText(payload);
  }
  addStoreMarker = (store) => {
    if (!store.latitude || !store.longitude) {
      return;
    }
    const newStores = sortByDistance(this.state.initialRegion, [store]);
    // sortByDistance to put distance key so that it can be displayed in list view
    this.props.updateNearByStores(newStores);
    this.props.clearProvince();
    this.props.clearService();
    this.hideSearchModal();
    const storeMarker = {
      ...mapConfig.initialRegion,
      latitude: store.latitude,
      longitude: store.longitude
    };
    this.setState({initialRegion: storeMarker});
  }

  componentWillReceiveProps (nextProps) {
    if ((!isEmpty(nextProps.selectedProvince)) && (nextProps.selectedProvince !== this.props.selectedProvince)) {
      this.setState({initialRegion: {
        ...mapConfig.defaultZoom.province,
        latitude: nextProps.selectedProvince.lat,
        longitude: nextProps.selectedProvince.long
      }});
    }
  }

  componentWillMount () {
    const {selectedProvince} = this.props;
    if (selectedProvince) {
      this.setState({initialRegion: {
        ...mapConfig.defaultZoom.province,
        latitude: selectedProvince.lat,
        longitude: selectedProvince.long
      }});
    } else {
      return getCurrentPosition()
        .then((coordinates) => {
          this.updateMap(coordinates, true);
        }).catch(() => {
          this.updateMap(this.state.initialRegion, true);
        });
    }
  }

  updateMap = (coordinates, shouldUpdateLocation = false) => { // shows nearByStores based on currentLocation
    const {allStores, changeCurrentLocation, radiusKM, updateNearByStores} = this.props;
    const defaultZoom = shouldUpdateLocation ? mapConfig.defaultZoom.location : mapConfig.defaultZoom.province;
    const initialRegion = {
      ...defaultZoom,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    };
    const nearByStores = sortByDistance(initialRegion, allStores.data, radiusKM);
    updateNearByStores(nearByStores);
    if (shouldUpdateLocation) {
      changeCurrentLocation(initialRegion);
    }
    this.setState({initialRegion: initialRegion});
  }

  onPressCurrLocation = () => {
    const {radiusKM, currentLocation, updateKMRadius, updateNearByStores, allStores, clearProvince} = this.props;
    const currLocRadiusKM = mapConfig.distanceLimit.currentLocation;
    if (radiusKM !== currLocRadiusKM) {
      clearProvince();
      updateKMRadius(currLocRadiusKM);
      const nearByStores = sortByDistance(currentLocation, allStores.data, currLocRadiusKM);
      updateNearByStores(nearByStores);
      this.setState({initialRegion: currentLocation});
    }
  }

  renderWithTab () {
    const {initialRegion, searchModalVisibility} = this.state;
    const {currentLocation, nearByStores, filteredStores, onCalloutPress, radiusKM, language} = this.props;
    const onSearchTextChange = debounce(this.onSearchTextChange, 500); // search only after 500 ms for better performance
    return <StoreLocatorMap radiusKM={radiusKM} onSearchPress={this.showSearchModal} initialRegion={initialRegion} currentLocation={currentLocation}
      markerList={nearByStores} searchModalVisibility={searchModalVisibility} onPressCurrLocation={this.onPressCurrLocation}
      hideSearchModal={this.hideSearchModal} onSearchTextChange={onSearchTextChange}
      filteredStores={filteredStores} addStoreMarker={this.addStoreMarker} onCalloutPress={onCalloutPress} language={language}/>;
  }
}

StoreLocatorMapPage.defaultProps = {
  currentLocation: null,
  updateKMRadius: noop,
  changeCurrentLocation: noop,
  updateNearByStores: noop,
  radiusKM: mapConfig.distanceLimit.currentLocation
};
StoreLocatorMapPage.propTypes = {
  currentLocation: PropTypes.object,
  changeCurrentLocation: PropTypes.func,
  updateNearByStores: PropTypes.func,
  updateKMRadius: PropTypes.func,
  selectedProvince: PropTypes.object,
  selectedService: PropTypes.string,
  radiusKM: PropTypes.number,
  nearByStores: PropTypes.array
};

export const mapStateToProps = (state) => ({
  currentLocation: result(state, 'user.currentLocation', null),
  selectedProvince: result(state, 'storeLocator.selectedProvince', null),
  selectedService: result(state, 'storeLocator.selectedService', null),
  radiusKM: result(state, 'storeLocator.radiusKM', null),
  nearByStores: result(state, 'storeLocator.nearByStores', []),
  filteredStores: result(state, 'storeLocator.filteredStores', []),
  allStores: result(state, 'storeLocator.allStores', {data: []}),
  language: result(state, 'user.language')
});

export const mapDispatchToProps = (dispatch) => ({
  changeCurrentLocation: bindActionCreators(actions.changeCurrentLocation, dispatch),
  updateNearByStores: bindActionCreators(actions.updateNearByStores, dispatch),
  updateKMRadius: bindActionCreators(actions.updateKMRadius, dispatch),
  clearProvince: bindActionCreators(actions.clearProvince, dispatch),
  clearService: bindActionCreators(actions.clearService, dispatch),
  changeSearchText: bindActionCreators(actions.changeSearchText, dispatch),
  clearFilteredStores: bindActionCreators(actions.clearFilteredStores, dispatch),
  onCalloutPress: (store) => () => dispatch(NavigationActions.navigate({routeName: 'StoreDetails', params: store}))
});
export default connect(mapStateToProps, mapDispatchToProps)(StoreLocatorMapPage);
