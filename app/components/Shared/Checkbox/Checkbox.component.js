import Icon from '../Icon/Icon.component';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import RNCheckBox from 'react-native-check-box';
import styles from './Checkbox.style';
import {View} from 'react-native';

class CheckBox extends Component {

  onClick = () => {
    const {onChange, isChecked, value} = this.props;
    onChange(!isChecked, value);
  }
  render () {
    const {disabled, iconSize, checkIconName, style, isChecked} = this.props;
    const checkIcon = <View style={disabled ? styles.checkedContainerDisabled : styles.checkedContainer}><Icon name={checkIconName} size={iconSize} style={styles.checkedIcon}/></View>;
    const uncheckIcon = <View style={disabled ? styles.unCheckedContainerDisabled : styles.unCheckedContainer}><Icon name={checkIconName} size={iconSize} style={styles.uncheckIcon}/></View>;
    return (
      <RNCheckBox checkedImage={checkIcon} unCheckedImage={uncheckIcon}
        isChecked={isChecked} disabled={disabled}
        onClick={this.onClick} style={style}
      />

    );
  }
}
CheckBox.defaultProps = {
  disabled: false,
  iconSize: 12,
  isChecked: false,
  onChange: noop, // CallBack on checkBox state change
  checkIconName: 'check',
  value: '', // Optional checkbox value for CallBack
  style: {}
};
CheckBox.propTypes = {
  disabled: PropTypes.bool,
  iconSize: PropTypes.number,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  checkIconName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.object
};
export default CheckBox;
