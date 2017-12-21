import merge from 'lodash/merge';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';
import {Icon, ISText, Touchable} from '../../Shared';
import {View} from 'react-native';
import * as ButtonStyles from './Button.style';

const Button = ({accessibilityLabel, text, type, iconName, style, disabled, iconStyle, textStyle, textType, testID, touchableStyle, onPress}) => {
  const styles = merge({}, ButtonStyles.baseStyles, ButtonStyles[`${type}Styles`]);
  const containerStyle = disabled ? [styles.container, style, styles.disabled, touchableStyle] : [styles.container, style, touchableStyle];
  return (
    <Touchable borderless={true} style={containerStyle} accessibilityLabel={accessibilityLabel} testID={testID} disabled={disabled} onPress={disabled ? noop : onPress} accessible={true}>
      <View style={styles.wrapper}>
        {iconName ? <Icon style={[styles.icon, iconStyle]} name={iconName} /> : null}
        <ISText type={textType} style={[styles.text, textStyle]}>{text}</ISText>
      </View>
    </Touchable>
  );
};

Button.defaultProps = {
  style: {},
  iconStyle: {},
  textStyle: {},
  touchableStyle: {},
  textType: 'BOLD',
  text: '',
  iconName: null,
  onPress: noop,
  type: 'primary'
};

Button.propTypes = {
  accessibilityLabel: PropTypes.string,
  style: PropTypes.object,
  iconStyle: PropTypes.object,
  touchableStyle: PropTypes.object,
  textStyle: PropTypes.object,
  text: PropTypes.string,
  iconName: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary', 'inline']),
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  textType: PropTypes.oneOf(['REGULAR', 'BOLD', 'LIGHT', 'MEDIUM', 'SEMIBOLD', 'THIN']),
  testID: PropTypes.string
};

export default Button;
