import Collapsible from 'react-native-collapsible';
import Icon from '../Icon/Icon.component';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Accordion.style.js';
import Touchable from '../Touchable/Touchable.component';
import {fonts} from '../../../themes/constants.styles';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimatableIcon = Animatable.createAnimatableComponent(Icon);

class Accordion extends React.Component {
  state = {
    isCollapsed: this.props.collapsedState
  }

  toggleCollapse = () => {
    this.props.onToggle();
    this.setState({isCollapsed: !this.state.isCollapsed});
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.collapsedState !== nextProps.collapsedState) {
      this.setState({isCollapsed: nextProps.collapsedState});
    }
  }

  render () {
    const {header, accordionStyle, headerStyle, elevation, headerSuffix} = this.props;
    const arrowStyle = this.state.isCollapsed ? styles.arrowStyleDefault : [styles.unCollapsedArrowStyle, styles.arrowStyleDefault];
    return (
      <View style={accordionStyle}>
        <Touchable elevation={elevation} onPress={this.toggleCollapse} style={[styles.touchableContainer, headerStyle]}>
          <View style={styles.headerContainer}>
            {header}
            <AnimatableIcon name={'chevron-down'} style={arrowStyle} size={fonts.FONT_SIZE_XS} transition='rotate' useNativeDriver/>
          </View>
        </Touchable>
        {headerSuffix}
        <Collapsible collapsed={this.state.isCollapsed}>
          {this.props.children}
        </Collapsible>
      </View>
    );
  }
}

Accordion.defaultProps = {
  headerStyle: {},
  elevation: 0,
  header: null,
  collapsedState: true,
  onToggle: noop
};

Accordion.propTypes = {
  children: PropTypes.node,
  header: PropTypes.node,
  accordionStyle: PropTypes.object,
  elevation: PropTypes.number,
  headerStyle: PropTypes.object,
  collapsedState: PropTypes.bool,
  onToggle: PropTypes.func,
  headerSuffix: PropTypes.node
};

export default Accordion;
