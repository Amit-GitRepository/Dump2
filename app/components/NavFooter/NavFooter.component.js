import bottomNavShadow from '../../assets/bottomNavShadow.png';
import NavFooterItem from './NavFooterItem.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './NavFooter.style';
import {Image, Platform, View} from 'react-native';

class NavFooter extends Component {
  DropShadowComponent = Platform.OS === 'android' ? <Image style={styles.androidShadowComponent} source={bottomNavShadow}/> : null;
  render () {
    const {currentScreen, goToScreen} = this.props;
    const footerConfig = [{
      icon: 'bitcoin',
      title: 'SIDE_MENU__BILLS_USAGE',
      screen: 'BillUsage'
    }, {
      icon: 'buy-extra',
      title: 'SIDE_MENU__BUY_EXTRA_PACKAGE',
      screen: 'BuyExtra'
    }, {
      icon: 'true-chat',
      title: 'SIDE_MENU__CHAT',
      screen: 'TrueChat'
    }];
    footerConfig.forEach((footerItem) => {
      footerItem.isActiveScreen = currentScreen === footerItem.screen;
      return footerItem;
    });
    return (
      <View style={styles.container}>
        {this.DropShadowComponent}
        <View style={styles.navRowContainer}>
          {
            footerConfig.map((item, index) => <NavFooterItem key={index} {...item} style={{}} goToScreen={goToScreen} isLastItem={index === footerConfig.length - 1}/>)
          }
        </View>
      </View>
    );
  }
}

NavFooter.propTypes = {
  goToScreen: PropTypes.func,
  currentScreen: PropTypes.string
};

export default NavFooter;
