import CurrentUsageTConv from '../CurrentUsageTConv.component';
import React from 'react'; // Enzyme adapter for React 16
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});
describe('CurrentUsageTConv component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<CurrentUsageTConv />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
