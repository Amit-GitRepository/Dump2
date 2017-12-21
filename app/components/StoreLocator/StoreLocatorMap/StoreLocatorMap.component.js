import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from '../StoreLocatorMap/StoreLocatorMap.style';
import trueShopMapViewTestIDs from '../../../config/testid/trueShopMapViewPage';
import {Button, IconTextInput, InfoBar, List, Map, Modal} from '../../Shared';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class StoreLocatorMap extends Component {
  addStoreMarker = (store) => () => this.props.addStoreMarker(store)

  listFilteredStores = (filteredStores) => {
    if (result(filteredStores, '[0].storeName') === translate('STORE_LOCATOR_STORE_NOT_FOUND')) {
      return (
        <View style={styles.listContainer}>
          <List data={filteredStores} headingKey='storeName'/>
        </View>
      );
    } else {
      const storeList = filteredStores.map((store) => {
        store.storeName = store.name[this.props.language] || store.name['en'];
        return store;
      });
      return (
        <View style={styles.listContainer}>
          <List onPress={this.addStoreMarker} data={storeList} headingKey='storeName'/>
        </View>
      );
    }
  }

  render () {
    const {initialRegion, searchModalVisibility, onSearchTextChange, markerList, currentLocation,
      onPressCurrLocation, onSearchPress, filteredStores, hideSearchModal, onCalloutPress, radiusKM, language} = this.props;
    const infoBarText = translate('STORE_LOCATOR__COVERAGE', {distance: radiusKM});
    return (
      <View style={styles.container}>
        <InfoBar text={infoBarText} style={styles.infoBar} accessibilityLabel={trueShopMapViewTestIDs.LABEL__INFOBAR_COVERAGE} testID={trueShopMapViewTestIDs.LABEL__INFOBAR_COVERAGE}/>
        <Map onSearchPress={onSearchPress} initialRegion={initialRegion} markerList={markerList}
          currentLocation={currentLocation} onPressCurrLocation={onPressCurrLocation} onCalloutPress={onCalloutPress} language={language}/>
        <Modal animationIn='fadeInDown' animationOut='fadeOutUp' style={styles.modal} onBackButtonPress={hideSearchModal} isVisible={searchModalVisibility} >
          <View style={styles.modalContent}>
            <View style={styles.searchBar}>
              <View style={styles.searchInput}>
                <IconTextInput containerStyle={styles.inputBar} style={styles.inputText}
                  placeholder={translate('STORE_LOCATOR__SEARCH')} onChangeText={onSearchTextChange}
                  iconName={'search'} iconSize={20} autoFocus/>
              </View>
              <View style={styles.buttonWrapper}>
                <Button type='inline' text={translate('STORE_LOCATOR__CANCEL')} onPress={hideSearchModal}/>
              </View>
            </View>
            {filteredStores.length > 0 ?
              this.listFilteredStores(filteredStores) : null
            }
          </View>

        </Modal>
      </View>
    );
  }
}

StoreLocatorMap.defaultProps = {
  initialRegion: null,
  markerList: [],
  filteredStores: [],
  currentLocation: null,
  addStoreMarker: noop,
  hideSearchModal: noop,
  onPressCurrLocation: noop,
  onSearchTextChange: noop,
  onCalloutPress: noop,
  onSearchPress: noop
};

StoreLocatorMap.propTypes = {
  initialRegion: PropTypes.object,
  markerList: PropTypes.array,
  filteredStores: PropTypes.array,
  currentLocation: PropTypes.object,
  onPressCurrLocation: PropTypes.func,
  hideSearchModal: PropTypes.func,
  onSearchTextChange: PropTypes.func,
  addStoreMarker: PropTypes.func,
  onSearchPress: PropTypes.func,
  onCalloutPress: PropTypes.func,
  searchModalVisibility: PropTypes.bool,
  radiusKM: PropTypes.number,
  language: PropTypes.string
};

export default StoreLocatorMap;
