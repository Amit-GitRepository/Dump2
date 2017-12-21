import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './ToggleButton.style';
import {Animated, TouchableWithoutFeedback, View} from 'react-native';
import {colors} from '../../../themes/constants.styles';

class ToggleButton extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      transformValue: new Animated.Value(props.value ? 30 : 0),
      currentColor: new Animated.Value(props.value ? 90 : -90)
    };
  }

  componentDidUpdate (prevProps) {
    const {value} = this.props;
    if (value !== prevProps) this.startGroupAnimations();
  }

  startGroupAnimations = () => {
    const {value} = this.props;
    Animated.parallel([
      Animated.spring(this.state.transformValue, {
        toValue: value ? 30 : 0,
        duration: 150
      }),
      Animated.timing(this.state.currentColor, {
        toValue: value ? 75 : -75,
        duration: 150
      })
    ]).start();
  }

  render () {
    const {
      onChangeValue
    } = this.props;

    const {
      currentColor,
      transformValue
    } = this.state;

    const toggleButtonColorValue = currentColor.interpolate({
      inputRange: [-90, 90],
      outputRange: [
        colors.SECONDARY_BG_TEXT_CONTRAST,
        colors.PRIMARY_ACTIONABLE
      ]
    });

    return (
      <TouchableWithoutFeedback onPress={onChangeValue}>
        <View style={styles.container}>
          <Animated.View style={[styles.switchView, {borderColor: toggleButtonColorValue}]} />
          <Animated.View style={[styles.buttonView, {left: transformValue, borderColor: toggleButtonColorValue, backgroundColor: toggleButtonColorValue}]} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

ToggleButton.defaultProps = {
  value: false,
  onChangeValue: noop
};

ToggleButton.propTypes = {
  value: PropTypes.bool,
  onChangeValue: PropTypes.func
};

export default ToggleButton;
