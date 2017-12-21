import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './CircleShadowSeparator.styles';
import {ISText} from '../../Shared';
import {View} from 'react-native';

class CircleShadowSeparator extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.topHalf} />
        <View style={styles.bottomHalf} />
        <View style={styles.semiCircle}><ISText type='BOLD' style={styles.text}>{this.props.text}</ISText></View>
      </View>
    );
  }
}

CircleShadowSeparator.defaultProps = {
  text: ''
};

CircleShadowSeparator.propTypes = {
  text: PropTypes.string
};

export default CircleShadowSeparator;
