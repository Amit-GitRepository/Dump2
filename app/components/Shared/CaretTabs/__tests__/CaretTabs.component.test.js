import CaretTabs from '../CaretTabs.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('CaretTabs component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<CaretTabs />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('should shallow render with default props', () => {
    const onTabPress = jest.fn();
    const wrapper = shallow(<CaretTabs onTabPress={onTabPress} />);
    wrapper.instance().onPress(1)();
    expect(wrapper).toBeDefined();
    expect(onTabPress).toBeCalledWith(1);
  });
});
