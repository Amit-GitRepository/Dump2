import Icon from '../Icon/Icon.component';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SquareIconButton.style';
import Touchable from '../Touchable/Touchable.component';
import {colors} from '../../../themes/constants.styles';
import {ISText} from '../../Shared';
import {View} from 'react-native';

class SquareIconButton extends Component {
  render () {
    const {title, subtitle, iconName, onPress, iconColor} = this.props;
    return (
      <Touchable borderless={true} onPress={onPress} style={styles.container}>
        <View style={styles.wrapper}>
          <Icon name={iconName} style={[styles.icon, {color: iconColor}]}/>
          <ISText style={styles.title} type='BOLD'>{title}</ISText>
          <View style={styles.subtextContainer}>
            <ISText type={'REGULAR'} style={styles.subtitle} noOfLines={1} ellipsizeMode={'tail'}>{subtitle}</ISText>
          </View>
        </View>
      </Touchable>
    );
  }
}

SquareIconButton.defaultProps = {
  title: '',
  subtitle: '',
  iconName: null,
  onPress: noop,
  iconColor: colors.PRIMARY_ACTIONABLE
};

SquareIconButton.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  iconName: PropTypes.string,
  onPress: PropTypes.func,
  iconColor: PropTypes.string
};

export default SquareIconButton;
