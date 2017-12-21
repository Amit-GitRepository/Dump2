import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './InfoBar.style';
import {ISText} from '../../Shared';
import {View} from 'react-native';

class InfoBar extends Component {
  render () {
    const {accessibilityLabel, text, style, testID} = this.props;
    return (
      <View style={[styles.container, style]} accessibilityLabel={accessibilityLabel} testID={testID}>
        <ISText style={styles.text}>{text}</ISText>
      </View>
    );
  }
}

InfoBar.defaultProps = {
  text: '',
  style: {}
};

InfoBar.propTypes = {
  accessibilityLabel: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
  testID: PropTypes.string
};

export default InfoBar;
