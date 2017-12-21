/* StoreDetails: Shows the details of each store shown in the store locator list view*/

import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import StoreDetailItem from '../StoreDetailItem/StoreDetailItem.component';
import styles from './StoreDetails.style';
import trueShopStoreDetailsTestIDs from '../../../config/testid/trueShopStoreDetails';
import {Button, Card, ISText, List} from '../../Shared';
import {ScrollView, View} from 'react-native';
import {translate} from '../../../language/i18n/helper';

class StoreDetails extends Component {
  formatContact = (contact) => {
    if (contact) {
      // to convert 9 or 10 digit contact number from 0916967185 to 091-696-7185 format with hyphen
      return (contact.substr(0, (contact.length - 7)) + '-' + contact.substr(-7, 3) + '-' + contact.substr(-4));
    }
    return null;
  }

  render () {
    const {onServiceClick, onGetDirectionClick, onCallClick, details} = this.props;
    const {services = [], distance, address, landmark, contact, name} = details;
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.outerContainer} elevation={2}>
          <Card header={name} containerStyles={styles.containerStyles} elevation={0}>
            <View style={styles.detailsContainer}>
              <StoreDetailItem heading={translate('STORE_LOCATOR__DETAILS_DISTANCE')} accessibilityLabel={trueShopStoreDetailsTestIDs.LABEL__DISTANCE} fontWeight={'BOLD'} label={translate('STORE_LOCATOR__DETAILS_DISTANCE_VAL', {distance})}/>
              <StoreDetailItem heading={translate('STORE_LOCATOR__DETAILS_ADDRESS')} accessibilityLabel={trueShopStoreDetailsTestIDs.LABEL__ADDRESS} label={address}/>
              <StoreDetailItem heading={translate('STORE_LOCATOR__DETAILS_LANDMARK')} accessibilityLabel={trueShopStoreDetailsTestIDs.LABEL__LANDMARK} label={landmark}/>
              <StoreDetailItem heading={translate('STORE_LOCATOR__DETAILS_CONTACT')} accessibilityLabel={trueShopStoreDetailsTestIDs.LABEL__CONTACT} label={this.formatContact(contact)}/>
              <View style={styles.buttonsContainer}>
                {contact ? <View style={styles.callButtonWrapper}><Button text={translate('STORE_LOCATOR__DETAILS_CONTACT')} style={styles.buttonCall} textStyle={styles.buttonText} onPress={onCallClick} type={'secondary'} accessibilityLabel={trueShopStoreDetailsTestIDs.BTN__CALL} testID={trueShopStoreDetailsTestIDs.BTN__CALL}/></View> : null}
                <View style={styles.directionButtonWrapper}><Button text={translate('STORE_LOCATOR__DETAILS_GET_DIRECTION')} onPress={onGetDirectionClick} accessibilityLabel={trueShopStoreDetailsTestIDs.BTN__GET_DIRECTION} testID={trueShopStoreDetailsTestIDs.BTN__GET_DIRECTION}/></View>
              </View>
            </View>
            {services.length > 0 ? <ISText style={styles.typeHeading}>{translate('STORE_LOCATOR__DETAILS_TYPE_OF_SERVICE')}</ISText> : null}
            <List data={services} headingKey='serviceName' onPress={onServiceClick}/>
          </Card>
        </View>
      </ScrollView>);
  }
}
StoreDetails.defaultProps = {
  details: {},
  onServiceClick: noop,
  onGetDirectionClick: noop,
  onCallClick: noop
};
StoreDetails.propTypes = {
  details: PropTypes.object,
  onServiceClick: PropTypes.func,
  onGetDirectionClick: PropTypes.func,
  onCallClick: PropTypes.func
};
export default StoreDetails;
