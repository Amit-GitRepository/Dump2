import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './OverLaySpinner.style';
import {ActivityIndicator} from 'react-native';
import {colors} from '../../../themes/constants.styles';
import {View} from 'react-native-animatable';

class OverlaySpinner extends Component {
  render () {
    const {showSpinner} = this.props;
    return (
      showSpinner ?
        <View style={styles.container}>
          <View style={styles.wrapperContainer} animation='zoomIn' duration={1000}>
            <ActivityIndicator color={colors.PRIMARY_BG_TEXT_CONTRAST} size='large'/>
          </View>
        </View> :
        null
    );
  }
}

OverlaySpinner.defaultProps = {
  showSpinner: 0
};

OverlaySpinner.propTypes = {
  showSpinner: PropTypes.number.isRequired
};

export default OverlaySpinner;
