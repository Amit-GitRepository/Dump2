import Proptypes from 'prop-types';
import React, {Component} from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {colors} from '../../../themes/constants.styles';

class CircularProgress extends Component {
  render () {
    const {size, width, fill, prefill, tintColor, backgroundColor, rotation, children} = this.props;
    return (
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={fill}
        prefill={prefill}
        tintColor={tintColor}
        backgroundColor={backgroundColor}
        rotation={rotation}>
        {children}
      </AnimatedCircularProgress>
    );
  }
}
CircularProgress.defaultProps = {
  size: 130,
  width: 5,
  fill: 0,
  prefill: 0,
  tintColor: colors.PRIMARY_ACTIONABLE,
  backgroundColor: colors.PRIMARY_BG_SEPARATOR,
  rotation: 90
};
CircularProgress.propTypes = {
  size: Proptypes.number,
  width: Proptypes.number,
  fill: Proptypes.number,
  prefill: Proptypes.number,
  tintColor: Proptypes.string,
  backgroundColor: Proptypes.string,
  rotation: Proptypes.number,
  children: Proptypes.node
};
export default CircularProgress;

// ********** PROPS *********
// size – width and height of the circle
// width - thickness of the line
// fill - current, percentage fill (from 0 to 100)
// prefill - percentage fill before the animation (from 0 to 100)
// tintColor - color of a progress line
// backgroundColor - color of a background for progress line
// rotation - by default, progress starts from the angle = 90⦝, you can change it by setting value from -360 to 360
