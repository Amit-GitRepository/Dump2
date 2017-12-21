import ComponentWithTabPage, {mapDispatchToProps, mapStateToProps} from '../ComponentWithTab.page';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';
import {createStore} from 'redux';
import {NavigationActions} from 'react-navigation';
import {Provider} from 'react-redux';

configure({adapter: new ReactSixteenAdapter()});

const store = createStore(() => ({
  user: {
    profile: {}
  },
  nav: {
    routes: []
  }
}));
const dispatch = jest.fn();

describe('ComponentWithTab page', () => {
  it('renders ', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ComponentWithTabPage />
      </Provider>);
    expect(wrapper).toBeDefined();
  });
});

// mapStateToProps
describe(('ComponentWithTab mapStateToProps'), () => {
  it('it has routes defined as props', () => {
    const props = mapStateToProps(store.getState());
    expect(props.routes).toBeDefined();
  });
  it('it has profile defined as props', () => {
    const props = mapStateToProps(store.getState());
    expect(props.profile).toBeDefined();
  });
});

// mapDispatchToProps
describe(('ComponentWithTab Page mapDispatchToProps'), () => {
  it('it has goToScreen defined as a props', () => {
    const props = mapDispatchToProps(dispatch);
    expect(props.goToScreen).toBeDefined();
  });
  it('goToScreen calls NavigationActions.navigate action', () => {
    const props = mapDispatchToProps(dispatch);
    props.goToScreen('ABC');
    expect(dispatch).toHaveBeenCalledWith(NavigationActions.navigate({routeName: 'ABC'}));
  });
});
