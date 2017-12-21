import CurrentUsageTM from '../CurrentUsageTM.component';
import React from 'react'; // Enzyme adapter for React 16
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('CurrentUsageTM component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<CurrentUsageTM />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
