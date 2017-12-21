import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import SideMenu, {mapDispatchToProps, mapStateToProps} from '../SideMenu.page';
import {changeLanguage} from '../../../redux/actions/index.actions';
import {configure, shallow} from 'enzyme';
import {createStore} from 'redux';
import {NavigationActions} from 'react-navigation';
import {Provider} from 'react-redux';

configure({adapter: new ReactSixteenAdapter()});

const store = createStore(() => ({
  user: {
    language: 'en',
    profile: {}
  },
  nav: {
    index: 0
  }
}));
const dispatch = jest.fn();

describe('SideMenu page', () => {
  it('renders ', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SideMenu />
      </Provider>);
    expect(wrapper).toBeDefined();
  });
});

// mapStateToProps
describe(('SideMenu mapStateToProps'), () => {
  it('it has language defined as props', () => {
    const props = mapStateToProps(store.getState());
    expect(props.language).toBeDefined();
  });
  it('it has profile defined as props', () => {
    const props = mapStateToProps(store.getState());
    expect(props.profile).toBeDefined();
  });
  it('it has navIndex defined as props', () => {
    const props = mapStateToProps(store.getState());
    expect(props.navIndex).toBeDefined();
  });
});

// mapDispatchToProps
describe(('SideMenu Page mapDispatchToProps'), () => {
  it('it has goToScreen defined as a props', () => {
    const props = mapDispatchToProps(dispatch);
    expect(props.goToScreen).toBeDefined();
  });
  it('goToScreen calls NavigationActions.navigate action  ', () => {
    const props = mapDispatchToProps(dispatch);
    props.goToScreen('ABC');
    expect(dispatch).toHaveBeenCalledWith(NavigationActions.navigate({routeName: 'ABC'}));
  });
  it('it has changeLanguage defined as a props', () => {
    const props = mapDispatchToProps(dispatch);
    expect(props.changeLanguage).toBeDefined();
  });
  it('changeLanguage calls changeLanguage action  ', () => {
    const props = mapDispatchToProps(dispatch);
    props.changeLanguage('en');
    expect(dispatch).toHaveBeenCalledWith(changeLanguage({language: 'en'}));
  });
});
