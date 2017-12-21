/* ServiceDetails: show static details of each service selected from StoreDetails*/

import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './ServiceDetails.style';
import {Card, List} from '../../Shared';
import {View} from 'react-native';

class ServiceDetails extends Component {
  render () {
    const {navigation} = this.props;
    const serviceDetails = result(navigation, 'state.params', {});
    return (
      <View style={styles.container}>
        <View style={styles.shadowContainer} elevation={5}>
          <Card header={serviceDetails.serviceName + ' Service'} cardWrapperStyles={styles.cardWrapperStyles} elevation={0}>
            <List data={serviceDetails.products} />
          </Card>
        </View>
      </View>);
  }
}
ServiceDetails.defaultProps = {
  navigation: {}
};
ServiceDetails.propTypes = {
  navigation: PropTypes.object
};
export default ServiceDetails;
