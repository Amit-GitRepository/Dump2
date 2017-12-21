import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenuItem.style';
import {Accordion, Icon, ISText, Touchable} from '../Shared';
import {colors, fonts} from '../../themes/constants.styles';
import {translate} from '../../language/i18n/helper';
import {View} from 'react-native';

class SideMenuItem extends Component {

  navigateToScreen = (screen) => () => {
    this.props.goToScreen(screen);
  }

  toggleSideMenuItem = (index) => () => this.props.toggleSideMenuAccordion(index);

  render () {
    const {icon, title, screen, index, nodes, openAccordionIndex, lastIndex, disabled} = this.props;
    if (nodes && nodes.length > 0) {
      const collapsedState = !(index === openAccordionIndex);
      const header = (
        <View style={disabled ? [styles.container, styles.disabledMenuItem] : styles.container}>
          <Icon name={icon} size={fonts.FONT_SIZE_XL} color={colors.PRIMARY_ACTIONABLE}/>
          <ISText type='BOLD' style={styles.menuTitle}>{translate(title)}</ISText>
        </View>
      );
      const headerSuffix = collapsedState && !lastIndex ? <View style={styles.separator} /> : null;
      return (
        <Accordion header={header} headerSuffix={headerSuffix} collapsedState={collapsedState} onToggle={this.toggleSideMenuItem(index)}>
          <View>
            {
              nodes.map((child, childIndex) => (
                <Touchable style={styles.subMenuItem} key={childIndex} onPress={this.navigateToScreen(child.screen)} disabled={child.disabled || disabled}>
                  <View>
                    {childIndex ? <View style={styles.separator} /> : null}
                    <View style={child.disabled || disabled ? [styles.subMenuContent, styles.disabledMenuItem] : styles.subMenuContent}>
                      <View style={styles.listMarker}/>
                      <ISText type='BOLD' style={styles.subMenuTitle}>{translate(child.title)}</ISText>
                    </View>
                  </View>
                </Touchable>
              ))
            }
          </View>
        </Accordion>
      );
    }
    return (
      <Touchable onPress={this.navigateToScreen(screen)} disabled={disabled}>
        <View>
          {index ? <View style={styles.separator} /> : null}
          <View style={disabled ? [styles.container, styles.disabledMenuItem] : styles.container}>
            <Icon name={icon} size={fonts.FONT_SIZE_XL} color={colors.PRIMARY_ACTIONABLE}/>
            <ISText type='BOLD' style={styles.menuTitle}>{translate(title)}</ISText>
          </View>
        </View>
      </Touchable>
    );
  }
}

SideMenuItem.defaultProps = {
  goToScreen: noop,
  toggleSideMenuAccordion: noop,
  disabled: false
};

SideMenuItem.propTypes = {
  goToScreen: PropTypes.func,
  icon: PropTypes.string,
  title: PropTypes.string,
  screen: PropTypes.string,
  index: PropTypes.number,
  nodes: PropTypes.array,
  toggleSideMenuAccordion: PropTypes.func,
  openAccordionIndex: PropTypes.number,
  lastIndex: PropTypes.bool,
  disabled: PropTypes.bool
};

export default SideMenuItem;
