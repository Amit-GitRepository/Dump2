import ComponentWithTabView from '../ComponentWithTabView.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('ComponentWithTabView component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ComponentWithTabView/>);
    const component = renderer.create(<ComponentWithTabView />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
});
