import AppContainer from '../App.container';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

jest.mock('redux-ga-screen-tracker/utils/transformer.utils', () => jest.fn(() => 'Landing'));
configure({adapter: new ReactSixteenAdapter()});
const store = createStore(() => ({spinner: {}, nav: {}, user: {language: 'en'}, sideMenu: {}, isUpdateAlertVisible: false}));

describe('AppContainer page', () => {
  let pageComponent = null;
  let instance = null;
  beforeEach(() => {
    const wrapper = shallow(<AppContainer store={store} />);
    pageComponent =  wrapper.find('App').shallow();
    instance = pageComponent.instance();
  });
  it('should render', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <AppContainer />
      </Provider>);
    expect(wrapper).toBeDefined();
  });
  xit('componentWillMount: should add BackHandler.addEventListener', () => {
    instance.componentWillMount();
    // Tests to be added here later
  });
});
