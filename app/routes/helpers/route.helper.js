import logo from '../../assets/logo.png';
import React from 'react';
import result from 'lodash/result';
import sharedTestIDs from '../../config/testid/sharedPage';
import styles from './route.style';
import {colors, fonts} from '../../themes/constants.styles';
import {Icon, ISHeader, ISText, Touchable} from '../../components/Shared';
import {Image, Keyboard} from 'react-native';
import {Platform} from '../../utils/reactNative.util.js';
import {routeConfig} from '../index.routes';
import {translate} from '../../language/i18n/helper';

export const generateDrawerHamburger = (currentNav, iconName) => {
  const onPress = () => {
    Keyboard.dismiss();
    currentNav.navigation.navigate('DrawerOpen');
  };
  return (
    <Touchable onPress={onPress} style={styles.headerLeft}>
      <Icon name={iconName} size={22} color={colors.SECONDARY_BG_TEXT_CONTRAST} accessibilityLabel={sharedTestIDs.ICON__HAMBURGER} testID={sharedTestIDs.ICON__HAMBURGER}/>
    </Touchable>
  );
};

export const generateBackButton = (currentNav) => {
  const onPress = () => currentNav.navigation.goBack();
  return (
    <Touchable onPress={onPress} style={styles.headerLeft}>
      <Icon name='back_arrow' size={fonts.FONT_SIZE_LARGE} color={colors.PRIMARY_ACTIONABLE} accessibilityLabel={sharedTestIDs.ICON__BACKBUTTON} testID={sharedTestIDs.ICON__BACKBUTTON}/>
    </Touchable>
  );
};

export const generateCloseButton = (currentNav) => {
  const onPress = () => {
    currentNav.screenProps.dismiss();
  };
  return (
    <Touchable onPress={onPress} style={styles.headerLeft}>
      <ISText style={styles.headerCloseButton} type='BOLD'>{translate('PAYMENT__CLOSE')}</ISText>
    </Touchable>
  );
};

// All screens except those in side menu list should have their titleKeys passed as param, otherwise will attempt to find in sidemenu config
export const getStackNavOption = (current) => {
  const titleKey = result(routeConfig[current.navigation.state.routeName], 'title', null);
  const showHamburger = result(routeConfig[current.navigation.state.routeName], 'showHamburger', false);
  const showIcon = result(routeConfig[current.navigation.state.routeName], 'showIcon', false);
  return {
    header: (props) => <ISHeader {...props} />, // eslint-disable-line react/display-name
    headerTitleStyle: styles.stackHeaderTitle,
    headerTitle: (showIcon ? <Image source={logo} resizeMode='contain' style={styles.headerIconstyle[Platform.OS]}/> : null),
    headerStyle: styles.headerStyle,
    headerLeft: showHamburger ? generateDrawerHamburger(current, 'menu') : generateBackButton(current),
    title: titleKey ? translate(titleKey) : result(current.navigation.state, 'params.title', '')
  };
};

export const getPaymentStatusHeader = (current) => {
  const titleKey = result(routeConfig[current.navigation.state.routeName], 'title', null);
  const showBack = result(routeConfig[current.navigation.state.routeName], 'showBack', true);
  const headerTitleStyle = showBack ? styles.paymentHeaderTitleWithBack : styles.paymentHeaderTitleWithoutBack;
  return {
    header: (props) => <ISHeader {...props} />, // eslint-disable-line react/display-name
    headerTitleStyle,
    headerStyle: styles.headerStyle,
    title: titleKey ? translate(titleKey) : result(current.navigation.state, 'params.title', ''),
    headerLeft: showBack ? generateBackButton(current) : null,
    headerRight: generateCloseButton(current),
    gesturesEnabled: showBack
  };
};
