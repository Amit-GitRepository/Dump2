import _ from 'lodash';
import Banner from '../Banner.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';
import {Text} from 'react-native';

configure({adapter: new ReactSixteenAdapter()});
jest.mock('resolveAssetSource', () => () => ({
  width: 20,
  height: 10
}));
describe('Banner component', () => {
  const wrapper = shallow(<Banner/>);

  it('renders correctly', () => {
    const component = renderer.create(<Banner />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly when isBackground image with children component', () => {
    const component = renderer.create(<Banner isBackground><Text>TEST</Text></Banner>).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    expect(wrapper).toBeDefined();
  });

  it('calculatesStyles: the style for imageView', () => {
    wrapper.setState({viewWidth: 30, viewHeight: 30, ratio: 1.5});
    wrapper.instance().calculateStyle(0, 30);
    expect(wrapper.instance().state.imageStyle).toEqual({'height': 15, 'width': '100%'});
  });

  it('onLayout: should set the state with viewWidth on layout', () => {
    const event = _.set({}, 'nativeEvent.layout.width', 10);
    wrapper.instance().onLayout(event);
    expect(wrapper.instance().state.viewWidth).toEqual(10);
  });
});
