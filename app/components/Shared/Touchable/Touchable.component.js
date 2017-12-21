import PropTypes from 'prop-types';
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import {Platform, View} from 'react-native';

/* This file exists so that if we want to use some other Touchable module or override touchable's behaviour
  We need to split the styles into two as the Android ToucableNativeFeedabck only clips the ripple effect
  when it's parent have border radius. And also we need the padding to be part of child of ToucableNativeFeedabck
  otherwise ripple effect will take the padding of parent.

  on IOS we should not split the ripple effect styles and pass the styles to child of Toucable as it self.

  TouchableOpacity also has a bug where it doesn't update opacity if disabled prop is changed. Please refer to https://github.com/facebook/react-native/issues/17105
*/

export const CustomBorderedTouchable = ({style, children, ...extraProps}) => {
  const mergedObj = Array.isArray(style) ? Object.assign({}, ...style) : style || {};
  const {opacity, ...otherStyles} = mergedObj;
  const touchableOpacity = opacity ? opacity : 1.0;
  return (
    <Touchable style={otherStyles} foreground={false} {...extraProps}>
      <View style={{opacity: touchableOpacity}}>
        {children}
      </View>
    </Touchable>
  );
};

CustomBorderedTouchable.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};

const getBorderStyle = (style) => {
  if (style) {
    const mergedObj = Array.isArray(style) ? Object.assign({}, ...style) : style;
    const {padding, paddingTop, paddingRight, paddingBottom, paddingLeft, paddingVertical, paddingHorizontal, ...extraStyles} = mergedObj;
    return {containerStyle: extraStyles, touchableStyles: {padding, paddingTop, paddingRight, paddingBottom, paddingLeft, paddingVertical, paddingHorizontal}};
  }
  return {containerStyle: {}, touchableStyles: {}};
};

export const CustomBordlessTouchable = ({style, ...extraProps}) => {
  const {containerStyle, touchableStyles} = getBorderStyle(style);
  return (
    <View style={containerStyle}>
      <Touchable style={touchableStyles} foreground={false} background={Touchable.SelectableBackgroundBorderless()} {...extraProps} />
    </View>
  );
};

CustomBordlessTouchable.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};

const CustomTouchable = ({borderless = false, ...extraProps}) => Platform.OS === 'android' && borderless ? <CustomBordlessTouchable {...extraProps}/> : <CustomBorderedTouchable {...extraProps}/>;

CustomTouchable.propTypes = {
  borderless: PropTypes.bool
};
export default CustomTouchable;
