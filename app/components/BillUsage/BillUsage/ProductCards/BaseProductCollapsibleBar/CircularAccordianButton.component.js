import noop from 'lodash/noop';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import semiCircle from '../../../../../assets/semiCircle.png';
import styles from './CircularAccordianButton.style';
import {Banner, Touchable} from '../../../../Shared';

class CircularAccordianButton extends Component {
  render () {
    const {isCollapsed, style, onClick} = this.props;
    const semiCircleImage = isCollapsed ? semiCircle : semiCircle;
    const accordionStyle = styles.accordionStyle;
    return (
      <Touchable borderless={true} onPress={onClick} style={[styles.container, style]}>
        <Banner source={semiCircleImage} style={accordionStyle} />
      </Touchable>
    );
  }
}
CircularAccordianButton.defaultProps = {
  isCollapsed: true,
  onClick: noop,
  style: {}
};
CircularAccordianButton.propTypes = {
  isCollapsed: Proptypes.bool,
  onClick: Proptypes.func,
  style: Proptypes.object
};

export default CircularAccordianButton;
