import deselectedTabBg from '../../../assets/deselectedTabBg.png';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './DeselectedTabView.style.js';
import {Banner} from '../../Shared';
import {View} from 'react-native';

// Will be used to add caret to the bottom of the view(which will be passsed as children)

class DeselectedTabView extends React.Component {
  render () {
    const {style} = this.props;
    return (
      <View style={style}>
        <Banner style={styles.deselectedBanner} source={deselectedTabBg}>
          {this.props.children}
        </Banner>
      </View>
    );
  }
}

DeselectedTabView.defaultProps = {
  iconSize: 15,
  customIconStyle: {},
  style: {}
};

DeselectedTabView.propTypes = {
  children: PropTypes.node,
  style: PropTypes.PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};
export default DeselectedTabView;
