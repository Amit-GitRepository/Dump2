import CurrentUsageCard from '../CurrentUsageCard/CurrentUsageCard.component';
import React from 'react'; // Enzyme adapter for React 16
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});
jest.mock('resolveAssetSource', () => () => ({
  width: 20,
  height: 10
}));
describe('CurrentUsageCard component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<CurrentUsageCard />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
