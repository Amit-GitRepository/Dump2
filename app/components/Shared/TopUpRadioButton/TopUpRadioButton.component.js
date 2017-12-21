import noop from 'lodash/noop';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './TopUpRadioButton.style';
import {ISText, Touchable} from '../../Shared';
import {Platform, View} from 'react-native';

class TopUpRadioButton extends Component {
  onToggle = () => {
    const {radioSelect, value} = this.props;
    radioSelect(value);
  }
  render () {
    const {active, label, style} = this.props;
    const activeContainerStyles = active ? styles.active : styles.inactive;
    const inactiveText = (Platform.OS === 'android') ? [styles.inactiveText, styles.androidText] : styles.inactiveText;
    const activeTextStyles = active ? styles.activeText : inactiveText;
    return (
      <Touchable borderless={true} onPress={this.onToggle} style={styles.clickableBox}>
        <View style={[styles.container, activeContainerStyles, style]}>
          <ISText type={active ? 'BOLD' : 'MEDIUM'} style={[styles.text, activeTextStyles]}>{label}</ISText>
        </View>
      </Touchable>);
  }
}
TopUpRadioButton.defaultProps = {
  active: false,
  label: '',
  value: '',
  radioSelect: noop,
  style: {}
};
TopUpRadioButton.propTypes = {
  active: Proptypes.bool,
  label: Proptypes.string,
  value: Proptypes.string,
  radioSelect: Proptypes.func,
  style: Proptypes.object
};
export default TopUpRadioButton;
