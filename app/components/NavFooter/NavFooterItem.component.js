import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './NavFooterItem.style';
import {colors, fonts} from '../../themes/constants.styles';
import {Dimensions, View} from 'react-native';
import {Icon, ISText, Touchable} from '../Shared';
import {translate} from '../../language/i18n/helper';

class NavFooterItem extends Component {
  navigateToScreen = (screen) => () => {
    this.props.goToScreen(screen);
  }

  render () {
    const {icon, screen, title, isActiveScreen, isLastItem} = this.props;
    const wrapperStyle = (Dimensions.get('window').width > 350) ? styles.wrapper : styles.wrapperSmallDevice;
    return (
      <Touchable style={isActiveScreen ? [wrapperStyle, styles.activeTab] : wrapperStyle} onPress={this.navigateToScreen(screen)}>
        <View style={isLastItem ? styles.container : [styles.container, styles.separator]}>
          <Icon name={icon} size={fonts.FONT_SIZE_XXL} color={isActiveScreen ? colors.PRIMARY_BG_TEXT_CONTRAST : colors.PRIMARY_TEXT_TAB_LABEL}/>
          <ISText type='BOLD' style={isActiveScreen ? [styles.tabTitle, styles.activeTabTitle] : styles.tabTitle}>{translate(title)}</ISText>
        </View>
      </Touchable>

    );
  }
}

NavFooterItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  screen: PropTypes.string,
  goToScreen: PropTypes.func,
  isActiveScreen: PropTypes.bool,
  isLastItem: PropTypes.bool
};

export default NavFooterItem;
