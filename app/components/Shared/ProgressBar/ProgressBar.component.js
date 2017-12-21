import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './ProgressBar.styles';
import {colors} from '../../../themes/constants.styles';
import {View} from 'react-native';

class ProgressBar extends Component {
  render () {
    const {percentage, fillColor, backgroundColor} = this.props;
    const fillContainer = {
      backgroundColor: backgroundColor
    };
    const fillBar = {
      flex: percentage,
      backgroundColor: fillColor
    };
    const percentageValue = (percentage > 100) ? 100 : percentage;
    const emptyFlex = {
      flex: 100 - percentageValue
    };
    return (
      <View style={[fillContainer, styles.container]}>
        {percentageValue ? <View style={[fillBar, styles.progressFill]}/> : null}
        <View style={[emptyFlex, styles.progressEmpty]}/>
      </View>
    );
  }
}

ProgressBar.defaultProps = {
  percentage: 100,
  fillColor: colors.PRIMARY_ACTIONABLE,
  backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  fillColor: PropTypes.string,
  backgroundColor: PropTypes.string
};

export default ProgressBar;
