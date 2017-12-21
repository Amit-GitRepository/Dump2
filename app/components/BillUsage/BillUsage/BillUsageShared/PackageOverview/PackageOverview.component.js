import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './PackageOverview.style';
import {ISText} from '../../../../Shared';
import {View} from 'react-native';

class PackageOverview extends Component {
  render () {
    const {title, subTitle, showSeparator} = this.props;
    return (
      <View style = {styles.planDetailsContainer}>
        <ISText type = 'BOLD' style = {styles.textTitle}>{title}</ISText>
        {subTitle ? <ISText style = {styles.textSubtitle}>{subTitle}</ISText> : null}
        {showSeparator ? <View style = {styles.bottomSeparator}/> : null}
      </View>
    );
  }
}
PackageOverview.defaultProps = {
  title: '',
  subTitle: '',
  showSeparator: true
};
PackageOverview.propTypes = {
  title: Proptypes.string,
  subTitle: Proptypes.string,
  showSeparator: Proptypes.bool
};
export default PackageOverview;
