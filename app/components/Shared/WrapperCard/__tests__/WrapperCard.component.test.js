import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter'; // Enzyme adapter for React 16
import renderer from 'react-test-renderer';
import WrapperCard from '../WrapperCard.component';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('WrapperCard component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<WrapperCard header = 'prepaid plans' />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('renders correctly when no header is passed', () => {
    const wrapper = shallow(<WrapperCard/>);
    const instance = wrapper.instance();
    const header = instance.props.header;
    expect(header).toEqual('');
  });
});
