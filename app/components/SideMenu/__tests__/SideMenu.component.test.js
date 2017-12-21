import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import SideMenu from '../SideMenu.component';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('SideMenu component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<SideMenu/>);
    const component = renderer.create(<SideMenu />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
  it('toggleSideMenuAccordion: set accordion collapse index', () => {
    const wrapper = shallow(<SideMenu/>);
    wrapper.setState({openAccordionIndex: -1});
    wrapper.instance().toggleSideMenuAccordion(1);
    expect(wrapper.instance().state.openAccordionIndex).toEqual(1);
  });
  it('componentWillReceiveProps: update openAccordionIndex state', () => {
    const wrapper = shallow(<SideMenu navIndex={1}/>);
    wrapper.setState({openAccordionIndex: 2});
    wrapper.instance().componentWillReceiveProps({navIndex: 0});
    expect(wrapper.instance().state.openAccordionIndex).toEqual(-1);
  });
});
