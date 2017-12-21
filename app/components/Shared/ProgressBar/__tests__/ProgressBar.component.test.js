import ProgressBar from '../ProgressBar.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('ProgressBar component', () => {
  it('renders correctly', () => {
    const iconTree = renderer.create(<ProgressBar />).toJSON();
    expect(iconTree).toMatchSnapshot();
  });
  it('renders correctly with greater than 100 value also', () => {
    const wrapper = shallow(<ProgressBar percentage={120}/>);
    expect(wrapper).toBeDefined();
  });
});
