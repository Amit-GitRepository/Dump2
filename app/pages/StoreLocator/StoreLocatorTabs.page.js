import filter from 'lodash/filter';
import mapConfig from '../../config/map.config';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import storeInfo from '../../config/storeInfo.config';
import StoreLocatorTab from '../../components/StoreLocator/StoreLocatorTab/StoreLocatorTab.component';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {setProvince, setService} from '../../redux/actions/index.actions';
import {sortByDistance} from '../../utils/location.util';

class StoreLocatorTabsPage extends Component {

    selectProvince = (province) => {
      const {selectProvince, language} = this.props;
      const selectedProvince = storeInfo.provinces.find((item) => item.name[language] === province);
      selectedProvince.longitude = selectedProvince.long,
      selectedProvince.latitude = selectedProvince.lat;
      const nearByStores = sortByDistance(selectedProvince, storeInfo.data, mapConfig.distanceLimit.province);
      selectProvince(selectedProvince, nearByStores);
    }

    selectService = (service) => {
      const {selectService, selectedProvince, radiusKM, currentLocation} = this.props;
      const nearByStores = sortByDistance((selectedProvince ? selectedProvince : currentLocation), storeInfo.data, radiusKM);
      const filteredStores = filter(nearByStores, function (store) {
        if (store.service) {
          const serviceList = Object.keys(store.service);
          if (serviceList.indexOf(service) !== -1) {
            return true;
          } else {
            serviceList.every(function (obj) {
              if (obj.indexOf(service) !== -1) {
                return true;
              }
            });
          }
        }
        return false;
      });
      selectService(service, filteredStores);
    }

    render () {
      const {radiusKM, onMapClick, onListClick, language, selectedProvince, selectedService} = this.props;
      const activeTabIndex = result(this.props, 'navigationState.index', 0);
      return (
        <StoreLocatorTab activeTabIndex={activeTabIndex} radiusKM={radiusKM} onMapClick={onMapClick} onListClick={onListClick}
          language={language} selectedProvince={result(selectedProvince, `name.${language}`, '')} selectedService={selectedService} selectProvince={this.selectProvince}
          selectService={this.selectService}/>
      );
    }
}

StoreLocatorTabsPage.defaultProps = {
  onListClick: noop,
  onMapClick: noop,
  selectProvince: noop,
  language: 'th',
  selectedProvince: null
};
StoreLocatorTabsPage.propTypes = {
  onListClick: PropTypes.func,
  onMapClick: PropTypes.func,
  selectProvince: PropTypes.func,
  selectService: PropTypes.func,
  selectedProvince: PropTypes.object,
  selectedService: PropTypes.string,
  currentLocation: PropTypes.object,
  radiusKM: PropTypes.number,
  language: PropTypes.string
  // nearByStores: PropTypes.array //TODO Check if this is useful otherwise remove
};

export const mapStateToProps = (state) => ({
  radiusKM: result(state, 'storeLocator.radiusKM', null),
  language: result(state, 'user.language', null),
  // nearByStores: result(state, 'storeLocator.nearByStores', null), //TODO Check if this is useful otherwise remove
  currentLocation: result(state, 'user.currentLocation', null),
  selectedProvince: result(state, 'storeLocator.selectedProvince', null),
  selectedService: result(state, 'storeLocator.selectedService', null)
});

export const mapDispatchToProps = (dispatch) => ({
  onMapClick: () => dispatch(NavigationActions.back()),
  onListClick: () => dispatch(NavigationActions.navigate({routeName: 'StoreLocatorList'})),
  selectProvince: (province, nearByStores) => dispatch(setProvince({province: province, 'nearByStores': nearByStores})),
  selectService: (service, nearByStores) => dispatch(setService({service: service, 'nearByStores': nearByStores}))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreLocatorTabsPage);
