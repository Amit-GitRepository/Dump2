import React from 'react';
import result from 'lodash/result';
import SideMenu from '../../components/SideMenu/SideMenu.component';
import {changeLanguage, logoutRequest} from '../../redux/actions/index.actions';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

export const mapStateToProps = ({user, nav}) => ({
  language: result(user, 'language'),
  profile: result(user, 'profile'),
  navIndex: result(nav, 'index')
});

export const mapDispatchToProps = (dispatch) => ({
  goToScreen: (screen) => dispatch(NavigationActions.navigate({routeName: screen})),
  changeLanguage: (language) => dispatch(changeLanguage({language})),
  onLogout: () => dispatch(logoutRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
