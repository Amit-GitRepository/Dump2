import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16
import TConvergenceCard from '../TConvergenceCard.component';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('TSmartChoiceCard component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<TConvergenceCard />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('should shallow render with default props', () => {
    const wrapper = shallow(<TConvergenceCard />);
    expect(wrapper).toBeDefined();
  });
});
