/* RadioButton: */

import noop from 'lodash/noop';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './RadioButton.style';
import Touchable from '../Touchable/Touchable.component';
import {View} from 'react-native';

class RadioButton extends Component {
  onClick = () => {
    const {value, onRadioSelect, isSelected} = this.props;
    onRadioSelect(value, isSelected);
  }
  render () {
    const {isSelected} = this.props;
    // TODO: Add inner shadow on inner circle when not selected
    const innerCircleStyles = isSelected ? styles.innerCircleSelected : styles.innerCircle;
    return (
      <Touchable style = {this.props.style} borderless={true} onPress={this.onClick}>
        <View style={styles.outerCircle} >
          <View style={innerCircleStyles} />
        </View>
      </Touchable>);
  }
}
RadioButton.defaultProps = {
  isSelected: false,
  onRadioSelect: noop,
  value: '',
  style: {}
};
RadioButton.propTypes = {
  isSelected: Proptypes.bool,
  onRadioSelect: Proptypes.func,
  value: Proptypes.string,
  style: Proptypes.oneOfType([
    Proptypes.array,
    Proptypes.object
  ])
};
export default RadioButton;
