import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import StoreDetails from '../StoreDetails.component';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('StoreDetails component', () => {
  it('StoreDetails: renders correctly', () => {
    const tree = renderer.create(<StoreDetails />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('formatContact: returns the contact number in correct format for 9 digit contact number', () => {
    const wrapper = shallow(<StoreDetails />);
    expect(wrapper.instance().formatContact('026584088')).toEqual('02-658-4088');
  });

  it('formatContact: returns the contact number in correct format for 10 digit contact number', () => {
    const wrapper = shallow(<StoreDetails />);
    expect(wrapper.instance().formatContact('0916967185')).toEqual('091-696-7185');
  });

  it('formatContact: returns null if null is passed', () => {
    const wrapper = shallow(<StoreDetails />);
    expect(wrapper.instance().formatContact(null)).toEqual(null);
  });

});
