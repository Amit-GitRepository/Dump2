import ComponentWithTab from '../ComponentWithTab.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import {createStore} from 'redux';
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

describe('ComponentWithTab component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ComponentWithTab/>
      </Provider>
    );
    const component = renderer.create(<Provider store={store}>
      <ComponentWithTab/>
    </Provider>).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
});
