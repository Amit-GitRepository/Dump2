import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16
import TMPrepaidProductCard from '../TMPrepaidProductCard.component';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});
jest.mock('moment', () => {
  const moment = require.requireActual('moment');
  const momentMock =  () => moment.utc(1482363367071);
  momentMock.defineLocale = moment.defineLocale;
  return momentMock;
});

describe('TMPrepaidProductCard component', () => {
  it('renders correctly', () => {
    Date.now = jest.fn(() => 1482363367071);
    const component = renderer.create(<TMPrepaidProductCard />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('should shallow render with default props', () => {
    const wrapper = shallow(<TMPrepaidProductCard />);
    expect(wrapper).toBeDefined();
  });
});
