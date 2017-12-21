import HotExtraPackageCard from '../HotExtraPackageCard.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('HotExtraPackageCard component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<HotExtraPackageCard />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('should shallow render with default props', () => {
    const wrapper = shallow(<HotExtraPackageCard />);
    expect(wrapper).toBeDefined();
  });
});
