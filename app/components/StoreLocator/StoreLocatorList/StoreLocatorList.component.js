import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './StoreLocatorList.style';
import trueShopMapViewTestIDs from '../../../config/testid/trueShopMapViewPage';
import {InfoBar, List} from '../../Shared';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class StoreLocatorList extends Component {

  render () {
    const {onStorePress, storeList, radiusKM} = this.props;
    const infoBarText = translate('STORE_LOCATOR__COVERAGE', {distance: radiusKM});
    return (<View style={styles.container}>
      <View style={styles.wrapper}>
        <InfoBar text={infoBarText} accessibilityLabel={trueShopMapViewTestIDs.LABEL__INFOBAR_COVERAGE} testID={trueShopMapViewTestIDs.LABEL__INFOBAR_COVERAGE}/>
        <List onPress={onStorePress} data={storeList} headingKey='storeName' subHeadingKey='subheading'/>
      </View>
    </View>);
  }
}

StoreLocatorList.defaultProps = {
  onStorePress: noop,
  storeList: []
};

StoreLocatorList.propTypes = {
  onStorePress: PropTypes.func,
  storeList: PropTypes.array,
  radiusKM: PropTypes.number
};

export default StoreLocatorList;
