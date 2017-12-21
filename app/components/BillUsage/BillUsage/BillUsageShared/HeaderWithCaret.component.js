/* Header with Caret component: */

import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './HeaderWithCaret.styles';
import {BottomCaretView} from '../../../Shared';
import {colors} from '../../../../themes/constants.styles';
import {shadowActiveStyle} from '../../../../themes/application.styles';
import {View} from 'react-native';

class HeaderWithCaret extends Component {
  render () {
    const {headerColor, iconSize, children, style, customIconStyle, caretShadow} = this.props;
    return (
      <View style={styles.container}>
        <BottomCaretView caretColor={headerColor} iconSize = {iconSize} customIconStyle = {customIconStyle}>
          {caretShadow ? <View elevation={2} style={[styles.wrapper, style, {backgroundColor: headerColor}, shadowActiveStyle]}>
            {children}
          </View> : <View style={[styles.wrapper, style, {backgroundColor: headerColor}]}>
            {children}
          </View>
          }
        </BottomCaretView>
      </View>);
  }
}
HeaderWithCaret.defaultProps = {
  headerColor: colors.SECONDARY_TMOVE,
  iconSize: 30,
  customIconStyle: {},
  style: {},
  caretShadow: false
};
HeaderWithCaret.propTypes = {
  headerColor: Proptypes.string,
  iconSize: Proptypes.number,
  customIconStyle: Proptypes.object,
  children: Proptypes.node,
  style: Proptypes.object,
  caretShadow: Proptypes.bool
};
export default HeaderWithCaret;
