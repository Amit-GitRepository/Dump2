import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import SquareIconButton from '../SquareIconButton.component'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('SquareIconButton component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<SquareIconButton title=''  subtitle=''  iconName='trueid'/>);
    const component = renderer.create(<SquareIconButton />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
});
