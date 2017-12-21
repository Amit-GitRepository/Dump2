import PropTypes from 'prop-types';
import React from 'react';
import styles from './BottomCaretView.styles';
import {Icon} from '../../Shared';
import {View} from 'react-native';

// Will be used to add caret to the bottom of the view(which will be passsed as children)

class BottomCaretView extends React.Component {
  render () {
    const {iconSize, style, caretColor, customIconStyle} = this.props;
    const iconStyle = [styles.iconStyle, {bottom: iconSize / 2.5, marginBottom: -(iconSize / 2.5)}, customIconStyle]; // 2.5 is because of the spacing at top and bottom of the caret icon
    return (
      <View>
        <View style={style}>
          {this.props.children}
        </View>
        <Icon size={iconSize} color={caretColor} style={iconStyle} name='caret-down' />
      </View>
    );
  }
}

BottomCaretView.defaultProps = {
  iconSize: 15,
  customIconStyle: {},
  style: {}
};

BottomCaretView.propTypes = {
  customIconStyle: PropTypes.object,
  children: PropTypes.node,
  iconSize: PropTypes.number,
  style: PropTypes.PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  caretColor: PropTypes.string
};
export default BottomCaretView;
