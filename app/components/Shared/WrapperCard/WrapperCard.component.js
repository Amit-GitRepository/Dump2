import Proptypes from 'prop-types';
import React, {Component} from 'react';
import {ISText} from '../../Shared';
import {styles} from './WrapperCard.style';
import {View} from 'react-native';

class WrapperCard extends Component {
  render () {
    const {contentContainerStyles, style, children, header} = this.props;
    return (
      <View style = {[styles.wrapper, style]}>
        <View elevation={2} style = {[styles.container, contentContainerStyles]}>
          {children}
        </View>
        {header ? <View elevation={4} style = {styles.header}>
          <ISText style={styles.headerText} type='BOLD'>{this.props.header}</ISText>
        </View> : null}
      </View>
    );
  }
}
WrapperCard.defaultProps = {
  header: '',
  style: {},
  contentContainerStyles: {}
};
WrapperCard.propTypes = {
  header: Proptypes.string,
  children: Proptypes.node,
  style: Proptypes.object,
  contentContainerStyles: Proptypes.object
};

export default WrapperCard;
