import CircularProgress from '../CircularProgress.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter'; // Enzyme adapter for React 16
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('CircularProgress component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<CircularProgress />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('renders correctly', () => {
    const component = renderer.create(<CircularProgress showProgress={false}/>).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('renders correctly', () => {
    const wrapper = shallow(<CircularProgress/>);
    expect(wrapper).toBeDefined();
  });
});
