import find from 'lodash/find';
import isArray from 'lodash/isArray';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import StoreDetails from '../../components/StoreLocator/StoreDetails/StoreDetails.component';
import storeInfo from '../../config/storeInfo.config'; // TODO: get this from reducer(part of another story)
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {openUrl, Platform} from '../../utils/reactNative.util';

class StoreDetailsPage extends Component {
  getDetails = () => {
    const storeDetails = result(this.props, 'navigation.state.params', {});
    const {language} = this.props;
    return {
      address: result(storeDetails, `address[${language}]`, ''),
      services: Object.keys(result(storeDetails, 'service', {})),
      distance: storeDetails.distance,
      landmark: result(storeDetails, `landmarks[${language}]`, ''),
      contact: result(storeDetails, 'contact.info.phonenumber'),
      name: storeDetails.name[language] || storeDetails.name['en'],
      id: storeDetails.id
    };
  }

  redirectToMaps = (latitude, longitude, name) => Platform.OS === 'ios' ?
    openUrl(`http://maps.apple.com/?ll=${latitude},${longitude}&q=${name}`) :
    openUrl(`http://maps.google.com/maps?q=${latitude},${longitude}&label=${name}`);

  onGetDirectionClick = () => {
    const latitude = result(this.props, 'navigation.state.params.latitude');
    const longitude = result(this.props, 'navigation.state.params.longitude');
    const shopName = result(this.props, 'navigation.state.params.name');
    return latitude && longitude ? this.redirectToMaps(latitude, longitude, shopName[this.props.language] || shopName['en']) : noop;
  };
  onCallClick = () => openUrl(`tel:${result(this.props, 'navigation.state.params.contact.info.phonenumber')}`);
  getProducts = (serviceName, storeId, storesInfo) => {
    if (!storesInfo || !isArray(storesInfo.data)) return [];
    const selectedStore = find(storesInfo.data, {id: storeId});
    const productIds = result(selectedStore, `service.${serviceName}`, []);
    const products = productIds.map((id) => result(storesInfo, `metaData.services.${id}`, ''));
    return products;
  }

  onServiceClick = (serviceName) => () => {
    if (serviceName.indexOf(' Service') > 0) {
      serviceName = serviceName.substr(0, serviceName.indexOf(' Service'));
    }
    const storeDetails = result(this.props, 'navigation.state.params', {});
    const products = this.getProducts(serviceName, storeDetails.id, storeInfo);
    this.props.navigateToServiceDetails({serviceName, products});
  }

  appendServiceText = (details) => {
    if (details.services.length) {
      details.services = details.services.map((service) => service + ' Service');
    }
    return details;
  }

  render () {
    const details = this.getDetails();
    return <StoreDetails details={this.appendServiceText(details)} onServiceClick={this.onServiceClick}
      onCallClick={this.onCallClick} onGetDirectionClick={this.onGetDirectionClick}/>;
  }
}

StoreDetailsPage.propTypes = {
  language: PropTypes.string,
  navigateToServiceDetails: PropTypes.func
};
const mapStateToProps = (state) => ({
  language: state.user.language
});
export const mapDispatchToProps = (dispatch) => ({
  navigateToServiceDetails: (params) => {
    dispatch(NavigationActions.navigate({routeName: 'ServiceDetails', params}));
  }
});
const ConnectedStoreDetailsPage = connect(mapStateToProps, mapDispatchToProps)(StoreDetailsPage);
export default ConnectedStoreDetailsPage;
