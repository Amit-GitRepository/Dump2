import NavFooter from '../NavFooter/NavFooter.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './ComponentWithTabView.style';
import {ScrollView, View} from 'react-native';

class ComponentWithTabView extends Component {
  render () {
    const {goToScreen, currentScreen, isLoggedIn, children, scrollEnabled} = this.props;
    const contentContainerStyles = [styles.contentContainer, isLoggedIn ? styles.loggedInPadding : null];
    return (
      <View style={styles.container}>
        <ScrollView scrollEnabled={scrollEnabled}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={contentContainerStyles}
        >
          {children}
        </ScrollView>
        {isLoggedIn ? <NavFooter goToScreen={goToScreen} currentScreen={currentScreen}/> : null}
      </View>
    );
  }
}

ComponentWithTabView.defaultProps = {
  scrollEnabled: true
};

ComponentWithTabView.propTypes = {
  currentScreen: PropTypes.string,
  goToScreen: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  children: PropTypes.node,
  scrollEnabled: PropTypes.bool
};
export default ComponentWithTabView;
