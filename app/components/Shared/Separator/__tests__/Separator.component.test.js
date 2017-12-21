import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import Separator from '../Separator.component'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('Separator component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Separator/>);
    const component = renderer.create(<Separator />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
  it('renders correctly', () => {
    const wrapper = shallow(<Separator/>);
    expect(wrapper).toBeDefined();
  });
});
