import KeyboardScrollView from '../KeyboardScrollView.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme'; // Enzyme adapter for React 16
import {View} from 'react-native';

configure({adapter: new ReactSixteenAdapter()});

describe('KeyboardScrollView component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<KeyboardScrollView><View /></KeyboardScrollView>);
    const component = renderer.create(<KeyboardScrollView><View /></KeyboardScrollView>).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
});
