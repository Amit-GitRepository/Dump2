import ComponentWithTab from '../../components/ComponentWithTab/ComponentWithTab.component';
import PropTypes from 'prop-types';
import React from 'react';
import result from 'lodash/result';
import StoreLocatorList from '../../components/StoreLocator/StoreLocatorList/StoreLocatorList.component';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {translate} from '../../language/i18n/helper';

class StoreLocatorListPage extends ComponentWithTab {
  renderWithTab () {
    const {nearByStores, onStorePress, radiusKM} = this.props;
    return <StoreLocatorList onStorePress={onStorePress} storeList={nearByStores} radiusKM={radiusKM}/>;
  }
}

StoreLocatorListPage.defaultProps = {
  nearByStores: []
};
StoreLocatorListPage.propTypes = {
  onStorePress: PropTypes.func,
  nearByStores: PropTypes.array,
  radiusKM: PropTypes.number
};

export const mapStateToProps = (state) => {
  const language = state.user.language;
  const nearByStores = result(state, 'storeLocator.nearByStores', []);
  const radiusKM = result(state, 'storeLocator.radiusKM', null);
  const addDistance = (store) => ({
    ...store,
    subheading: translate('STORE_LOCATOR__DETAILS_DISTANCE') + ' ' + translate('STORE_LOCATOR__DETAILS_DISTANCE_VAL', {distance: store.distance})});
  const sanitizeName = (store) => ({...store, storeName: store.name[language] || store.name['en']});
  const transformedStores = nearByStores.map(addDistance).map(sanitizeName);
  return {nearByStores: transformedStores, radiusKM: radiusKM};
};

export const mapDispatchToProps = (dispatch) => ({
  onStorePress: (store) => () => dispatch(NavigationActions.navigate({routeName: 'StoreDetails', params: store}))
});

const ConnectedStoreLocatorListPage = connect(mapStateToProps, mapDispatchToProps)(StoreLocatorListPage);
export default ConnectedStoreLocatorListPage;
