import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './ISText.style';
import {fonts} from '../../../themes/constants.styles';
import {Text} from 'react-native';

class ISText extends Component {
  render () {
    const {type, style, children, ...extraProps} = this.props;
    const fontFamilyStyle = {fontFamily: fonts[`FONT_FAMILY_${type}`]};
    const textStyle = Array.isArray(style) ? [styles.text, style, fontFamilyStyle] : {...styles.text, ...style, ...fontFamilyStyle};
    return (
      <Text style={textStyle} {...extraProps}>{children}</Text>
    );
  }
}

ISText.defaultProps = {
  type: 'REGULAR',
  style: {},
  children: null
};

ISText.propTypes = {
  type: PropTypes.oneOf(['REGULAR', 'BOLD', 'LIGHT', 'MEDIUM', 'SEMIBOLD', 'THIN']),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  children: PropTypes.node
};

export default ISText;
