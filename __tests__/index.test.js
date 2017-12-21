import Index from '../index.js';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('Index component', () => {
  it('renders correctly with icon', () => {
    const wrapper = shallow(<Index />);
    expect(wrapper).toBeDefined();
  });
});
