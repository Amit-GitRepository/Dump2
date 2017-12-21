import BillingMethodsPage from '../BillingMethods.page';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

configure({adapter: new ReactSixteenAdapter()});

const store = createStore(() => ({user: {language: 'en'}}));

describe('BillingMethodsPage page', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <BillingMethodsPage ebillContent={[]} paperBillContent={[]} />
      </Provider>);
    expect(wrapper).toBeDefined();
  });
});
