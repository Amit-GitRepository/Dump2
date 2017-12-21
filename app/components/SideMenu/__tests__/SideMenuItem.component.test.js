import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import SideMenuItem from '../SideMenuItem.component';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('SideMenuItem component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<SideMenuItem/>);
    const component = renderer.create(<SideMenuItem />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
});
