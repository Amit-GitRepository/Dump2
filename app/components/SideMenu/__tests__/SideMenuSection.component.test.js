import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import SideMenuSection from '../SideMenuSection.component';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('SideMenuSection component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<SideMenuSection/>);
    const component = renderer.create(<SideMenuSection />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
});
