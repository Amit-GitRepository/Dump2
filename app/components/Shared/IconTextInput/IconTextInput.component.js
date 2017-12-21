import Icon from '../Icon/Icon.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './IconTextInput.styles';
import {colors} from '../../../themes/constants.styles';
import {TextInput, View} from 'react-native';

class IconTextInput extends Component {
  render () {
    const {accessibilityLabel, placeholder, iconName, iconSize, containerStyle, style, testID, type, ...extraProps} = this.props;
    const wrapperStyle = type === 'SECONDARY' ? [styles.container, styles.secondary, containerStyle] : [styles.container, containerStyle];
    return (
      <View style={wrapperStyle} accessibilityLabel={accessibilityLabel} testID={testID}>
        <Icon style={styles.icon} name={iconName} size={iconSize}/>
        <TextInput style={[styles.input, style]}
          placeholder={placeholder}
          underlineColorAndroid={colors.TRANSPARENT}
          placeholderTextColor={colors.PRIMARY_DISABLED_BG_TEXT} {...extraProps}/>
      </View>
    );
  }
}

IconTextInput.defaultProps = {
  containerStyle: {},
  style: {},
  placeholder: '',
  iconName: null,
  iconSize: 35
};

IconTextInput.propTypes = {
  accessibilityLabel: PropTypes.string,
  type: PropTypes.oneOf(['SECONDARY', 'PRIMARY']),
  containerStyle: PropTypes.object,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  testID: PropTypes.string
};

export default IconTextInput;
