import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import SideMenuItem from './SideMenuItem.component';
import styles from './SideMenuSection.style';
import {ISText} from '../Shared';
import {translate} from '../../language/i18n/helper';
import {View} from 'react-native';

class SideMenuSection extends Component {

  render () {
    const {section, goToScreen, toggleSideMenuAccordion, openAccordionIndex} = this.props;
    const sectionView = (
      <View>
        <ISText style={styles.sectionTitle} type='BOLD'>{translate(section.title)}</ISText>
        {
          result(this.props, 'section.nodes', []).map((item, index) => (
            <SideMenuItem key={index} index={index} lastIndex={index === (section.nodes.length - 1)} {...item} goToScreen={goToScreen} toggleSideMenuAccordion={toggleSideMenuAccordion} openAccordionIndex={openAccordionIndex}/>)
          )
        }
      </View>
    );
    return sectionView;
  }
}

SideMenuSection.defaultProps = {
  section: {},
  goToScreen: noop,
  toggleSideMenuAccordion: noop
};

SideMenuSection.propTypes = {
  goToScreen: PropTypes.func,
  section: PropTypes.object,
  toggleSideMenuAccordion: PropTypes.func,
  openAccordionIndex: PropTypes.number
};

export default SideMenuSection;
