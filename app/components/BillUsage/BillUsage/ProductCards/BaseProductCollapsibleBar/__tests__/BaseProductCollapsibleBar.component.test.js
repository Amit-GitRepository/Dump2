import BaseProductCollapsibleBar from '../BaseProductCollapsibleBar.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('BaseProductCollapsibleBar component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<BaseProductCollapsibleBar />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('should shallow render with default props', () => {
    const wrapper = shallow(<BaseProductCollapsibleBar />);
    expect(wrapper).toBeDefined();
  });
  it('should have isCollapsed state as false', () => {
    const wrapper = shallow(<BaseProductCollapsibleBar />);
    expect(wrapper.state.isCollapsed).toBeFalsy();
  });
});
