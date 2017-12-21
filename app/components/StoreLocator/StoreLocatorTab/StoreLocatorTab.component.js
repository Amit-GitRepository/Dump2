import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import storeInfo from '../../../config/storeInfo.config';
import styles from './StoreLocatorTab.style';
import trueShopMapViewTestIDs from '../../../config/testid/trueShopMapViewPage';
import {CaretTabs, Dropdown} from '../../Shared';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class StoreLocatorTabs extends Component {
  getProvices = () => {
    const {language}  = this.props;
    return storeInfo.provinces.map((province) => province.name[language]);
  }
  render () {
    const {onMapClick, onListClick, selectedProvince, selectedService, selectProvince, selectService, activeTabIndex}  = this.props;
    const headerList = [{text: translate('STORE_LOCATOR__MAP')}, {text: translate('STORE_LOCATOR__LIST')}];
    const onTabPress = activeTabIndex !== 0 ? onMapClick : onListClick;
    return (
      <View style={styles.container}>
        <CaretTabs headerContainerStyle={styles.caretHeader} onTabPress={onTabPress} selectedIndex={activeTabIndex} headerList={headerList} bodyStyle={styles.caretTabBody} disableShadow={true} accessibilityLabel={trueShopMapViewTestIDs.TAB__MAPANDLIST_VIEW} testID={trueShopMapViewTestIDs.TAB__MAPANDLIST_VIEW}/>
        <View style={styles.dropdownContainer}>
          <Dropdown value={selectedProvince} data={this.getProvices().sort()} unselectedText={translate('STORE_LOCATOR__SELECT_AREA')} headerText={translate('STORE_LOCATOR__HEADER_SELECT_AREA')}
            onSelect={selectProvince} style={styles.fixMargin} accessibilityLabel={trueShopMapViewTestIDs.DROPDOWN__SELECTAREA} testID={trueShopMapViewTestIDs.DROPDOWN__SELECTAREA}/>
          <Dropdown value={selectedService} data={storeInfo.services} unselectedText= {translate('STORE_LOCATOR__SELECT_SERVICE')} headerText={translate('STORE_LOCATOR__HEADER_SELECT_SERVICE')}
            onSelect={selectService} accessibilityLabel={trueShopMapViewTestIDs.DROPDOWN__SELECTSERVICE} testID={trueShopMapViewTestIDs.DROPDOWN__SELECTSERVICE}/>
        </View>
      </View>
    );
  }
}

StoreLocatorTabs.defaultProps = {
  onListClick: noop,
  onMapClick: noop,
  selectProvince: noop,
  selectService: noop,
  language: 'th',
  selectedProvince: '',
  selectedService: ''
};
StoreLocatorTabs.propTypes = {
  onListClick: PropTypes.func,
  onMapClick: PropTypes.func,
  selectProvince: PropTypes.func,
  selectService: PropTypes.func,
  language: PropTypes.string,
  activeTabIndex: PropTypes.number,
  selectedProvince: PropTypes.string,
  selectedService: PropTypes.string
};
export default StoreLocatorTabs;
