import Footer from './Footer.component';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import SideMenuSection from './SideMenuSection.component';
import styles from './SideMenu.style';
import versionNumber from 'react-native-version-number';
import {ISText} from '../Shared';
import {menuConfig} from '../../config/sideMenu.config';
import {ScrollView, View} from 'react-native';
import {translate} from '../../language/i18n/helper';

class SideMenu extends Component {

  state = {
    openAccordionIndex: -1
  }

  toggleSideMenuAccordion = (index) => {
    if (index === this.state.openAccordionIndex) {
      this.setState({
        openAccordionIndex: -1
      });
    } else {
      this.setState({
        openAccordionIndex: index
      });
    }

  }

  generateSection (section, index) {
    const {goToScreen} = this.props;
    const {openAccordionIndex} = this.state;
    return <SideMenuSection section={section} key={index} goToScreen={goToScreen} toggleSideMenuAccordion={this.toggleSideMenuAccordion} openAccordionIndex={openAccordionIndex}/>;
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.navIndex === 1 && nextProps.navIndex === 0) {
      this.setState({openAccordionIndex: -1});
    }
  }

  render () {
    const {changeLanguage, language, goToScreen, profile, onLogout} = this.props;
    const isLoggedIn = !isEmpty(profile);
    return (
      <View style={styles.container}>
        <ScrollView>
          {menuConfig.map((item, index) => this.generateSection(item, index))}
        </ScrollView>
        <View style={styles.versionContainer}>
          <ISText style={styles.versionNumberText} type='BOLD'>
            {translate('SIDE_MENU__VERSION_NUMBER')} {versionNumber.appVersion}
          </ISText>
        </View>
        <Footer
          goToScreen={goToScreen}
          changeLanguage={changeLanguage}
          language={language}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
        />
      </View>
    );
  }
}

SideMenu.defaultProps = {
  goToScreen: noop,
  changeLanguage: noop
};

SideMenu.propTypes = {
  goToScreen: PropTypes.func,
  changeLanguage: PropTypes.func,
  language: PropTypes.string,
  profile: PropTypes.object,
  navIndex: PropTypes.number,
  onLogout: PropTypes.func
};

export default SideMenu;
