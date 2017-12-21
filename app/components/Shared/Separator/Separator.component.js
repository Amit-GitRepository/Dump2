import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Separator.styles';
import {ISText} from '../../Shared';
import {View} from 'react-native';

class Separator extends Component {
  render () {
    const {text} = this.props;
    return (
      <View style={styles.container}>
        <View style={[styles.line, styles.leftLine]} />
        <ISText type='BOLD' style={styles.text}>{text}</ISText>
        <View style={[styles.line, styles.rightLine]} />
      </View>
    );
  }
}

Separator.defaultProps = {
  text: ''
};

Separator.propTypes = {
  text: PropTypes.string
};

export default Separator;
