import NavFooter from '../NavFooter.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('NavFooter component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<NavFooter/>);
    const component = renderer.create(<NavFooter />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
});
