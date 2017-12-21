import Icon from '../Icon.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('Icon component', () => {
  const wrapper = shallow(<Icon/>);
  it('renders correctly', () => {
    const iconTree = renderer.create(<Icon />).toJSON();
    expect(iconTree).toMatchSnapshot();
  });
  it('renders correctly', () => {
    expect(wrapper).toBeDefined();
  });
});
