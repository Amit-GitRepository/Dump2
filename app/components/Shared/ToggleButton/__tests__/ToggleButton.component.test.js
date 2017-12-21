import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import ToggleButton from '../ToggleButton.component'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('ToggleButton component', () => {
  const changeMock = () => jest.fn();
  it('renders correctly', () => {
    const wrapper = shallow(
      <ToggleButton
        value={true}
        onChangeValue={changeMock}
      />);
    const component = renderer.create(<ToggleButton
      value={true}
      onChangeValue={changeMock}
    />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
  it('renders correctly with icon', () => {
    const wrapper = shallow(
      <ToggleButton
        value={true}
        onChangeValue={changeMock}
      />);
    expect(wrapper).toBeDefined();
  });
});
