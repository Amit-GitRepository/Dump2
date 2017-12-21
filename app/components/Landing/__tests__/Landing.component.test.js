import Landing from '../Landing.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('Landing component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Landing selectedLanguage='th'/>);
    const component = renderer.create(<Landing selectedLanguage='th'/>).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
});
