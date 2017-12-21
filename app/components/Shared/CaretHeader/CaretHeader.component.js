import BottomCaretView from '../BottomCaretView/BottomCaretView.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './CaretHeader.styles.js';
import Touchable from '../Touchable/Touchable.component';
import {colors} from '../../../themes/constants.styles';
import {ISText} from '../../Shared';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimatableBottomCaretView = Animatable.createAnimatableComponent(BottomCaretView);

// CaretHeader: To be used in most of the cards with header.
// View, children and text style can be overridden by props.

class CaretHeader extends Component {
  render () {
    const {active, onPress, text, wrapperStyles, iconSize, activeStyles, inActiveStyles, titleWrapperStyle, caretColor, children, caretTextType} = this.props;
    const titleContentStyle = active ? [styles.titleContent, activeStyles] : [styles.titleContent, inActiveStyles];
    const WrapperView = onPress ? Touchable : View;
    const ActiveView = active ? AnimatableBottomCaretView : Animatable.View;
    const titleStyle = active ? [styles.title, styles.activeTitle] : styles.title;
    const titleContainerStyles = [styles.titleContainer, {borderBottomColor: caretColor}];

    return (
      <WrapperView style={wrapperStyles} onPress={onPress}>
        <ActiveView useNativeDriver animation='fadeIn' duration={500} caretColor={caretColor} iconSize={iconSize} style={styles.caretShadow}>
          <View style={titleContainerStyles}>
            <View style={[titleContentStyle, titleWrapperStyle]}>
              {text ? <ISText style={titleStyle} type={caretTextType}>{text}</ISText> : null}
              {children}
            </View>
          </View>
        </ActiveView>
      </WrapperView>
    );
  }
}

CaretHeader.defaultProps = {
  active: false,
  onPress: null,
  text: '',
  wrapperStyles: {},
  activeStyles: styles.activeStyle,
  inActiveStyles: {},
  titleWrapperStyle: {},
  iconSize: 15,
  caretColor: colors.PRIMARY_ACTIONABLE,
  caretTextType: 'REGULAR'
};
CaretHeader.propTypes = {
  active: PropTypes.bool,
  onPress: PropTypes.func,
  text: PropTypes.string,
  wrapperStyles: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  activeStyles: PropTypes.object,
  inActiveStyles: PropTypes.object,
  titleWrapperStyle: PropTypes.object,
  iconSize: PropTypes.number,
  caretColor: PropTypes.string,
  children: PropTypes.node,
  caretTextType: PropTypes.string
};
export default CaretHeader;
