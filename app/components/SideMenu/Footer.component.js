import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Footer.style';
import {Button, ISText} from '../Shared';
import {translate} from '../../language/i18n/helper';
import {View} from 'react-native';

class Footer extends Component {

  selectLanguage = (languageChange) => () => {
    const {changeLanguage, language} = this.props;
    if (languageChange !== language) {
      changeLanguage(languageChange);
    }
  }

  navigateToLanding = () => {
    this.props.goToScreen('Landing');
  }

  render () {
    const {language, isLoggedIn, onLogout} = this.props;
    return (
      <View style={styles.container}>
        <View>
          <ISText style={styles.languageChangeText} type='BOLD'>{translate('SIDE_MENU__CHANGE_LANGUAGE')}</ISText>
          <View style={styles.languageSwitch}>
            <ISText type='BOLD' style={language === 'en' ? [styles.languageSelection, styles.activeLanguage] : styles.languageSelection} onPress={this.selectLanguage('en')}>EN</ISText>
            <View style={styles.separator} />
            <ISText type='BOLD' style={language === 'th' ? [styles.languageSelection, styles.activeLanguage] : styles.languageSelection} onPress={this.selectLanguage('th')}>TH</ISText>
          </View>
        </View>
        <View>
          <Button
            style={styles.navButton}
            textStyle={styles.navButtonText}
            onPress={isLoggedIn ? onLogout : this.navigateToLanding}
            text={isLoggedIn ? translate('SIDE_MENU__LOGOUT') : translate('SIDE_MENU__LANDING')}
          />
        </View>
      </View>
    );
  }
}

Footer.defaultProps = {
  goToScreen: noop,
  changeLanguage: noop
};

Footer.propTypes = {
  goToScreen: PropTypes.func,
  changeLanguage: PropTypes.func,
  language: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func
};

export default Footer;
