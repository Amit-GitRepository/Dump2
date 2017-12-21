import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class KeyboardScrollView extends Component {
  render () {
    const {children, ...extraProps} = this.props;
    return (
      <KeyboardAwareScrollView  overScrollMode={'auto'} {...extraProps}>{children}</KeyboardAwareScrollView>
    );
  }
}

KeyboardScrollView.defaultProps = {
  children: null
};

KeyboardScrollView.propTypes = {
  children: PropTypes.node
};

export default KeyboardScrollView;
