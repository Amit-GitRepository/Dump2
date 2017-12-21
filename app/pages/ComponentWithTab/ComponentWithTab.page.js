import ComponentWithTabView from '../../components/ComponentWithTab/ComponentWithTabView.component';
import getCurrentRouteName from 'redux-ga-screen-tracker/utils/transformer.utils';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

class ComponentWithTabPage extends Component {
  render () {
    const {goToScreen, profile, routes, children} = this.props;
    const isLoggedIn = !isEmpty(profile);
    const currentScreen = getCurrentRouteName(routes[0]);
    return (
      <ComponentWithTabView goToScreen={goToScreen} currentScreen={currentScreen} isLoggedIn={isLoggedIn}>
        {children}
      </ComponentWithTabView>
    );
  }
}

ComponentWithTabPage.propTypes = {
  profile: PropTypes.object,
  goToScreen: PropTypes.func,
  routes: PropTypes.array,
  children: PropTypes.node
};

export const mapStateToProps = ({user, nav}) => ({
  profile: result(user, 'profile'),
  routes: result(nav, 'routes')
});

export const mapDispatchToProps = (dispatch) => ({
  goToScreen: (screen) => {
    dispatch(NavigationActions.navigate({routeName: screen}));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithTabPage);
