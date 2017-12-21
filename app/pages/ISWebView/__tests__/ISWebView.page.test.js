import ISWebViewPage from '../ISWebView.page';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});
const navigation = {
  state: {
    params: {
      url: 'http://google.com'
    }
  } 
};

describe(('ISWebViewPage'), () => {
  it('renders ', () => {
    const wrapper = shallow(<ISWebViewPage navigation={navigation}/>);
    expect(wrapper).toBeDefined();
  });
});
