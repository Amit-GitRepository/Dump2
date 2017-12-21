import Accordion from '../Accordion.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('Accordion component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Accordion/>);
    const component = renderer.create(<Accordion />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
  it('toggleCollapse: toggles accordion collapse', () => {
    const wrapper = shallow(<Accordion/>);
    wrapper.setState({isCollapsed: false});
    wrapper.instance().toggleCollapse();
    expect(wrapper.instance().state.isCollapsed).toEqual(true);
  });
  it('componentWillReceiveProps: update collapse state', () => {
    const wrapper = shallow(<Accordion collapsedState={false}/>);
    wrapper.setState({isCollapsed: false});
    wrapper.instance().componentWillReceiveProps({collapsedState: true});
    expect(wrapper.instance().state.isCollapsed).toEqual(true);
  });
});
