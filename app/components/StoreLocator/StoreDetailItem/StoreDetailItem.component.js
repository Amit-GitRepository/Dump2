/* StoreDetailItem: show shop detail item such as distance, address etc. */

import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './StoreDetailItem.style';
import {ISText} from '../../Shared';
import {View} from 'react-native';

class StoreDetailItem extends Component {
  render () {
    const {heading, label, fontWeight, accessibilityLabel} = this.props;
    if (!heading || !label) {
      return null;
    }
    return (
      <View style={styles.detailItem}>
        <ISText style={styles.detailText} type={fontWeight} accessibilityLabel={accessibilityLabel + '_heading'} testID={accessibilityLabel + '_heading'}>{this.props.heading}</ISText>
        <ISText style={styles.detailText} type={fontWeight} accessibilityLabel={accessibilityLabel + '_value'} testID={accessibilityLabel + '_value'}>{this.props.label}</ISText>
      </View>);
  }
}
StoreDetailItem.defaultProps = {
  heading: '',
  label: '',
  fontWeight: 'REGULAR',
  accessibilityLabel: ''
};
StoreDetailItem.propTypes = {
  fontWeight: PropTypes.string,
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  accessibilityLabel: PropTypes.string
};
export default StoreDetailItem;
