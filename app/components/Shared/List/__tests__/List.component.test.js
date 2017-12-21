import List from '../List.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import {CustomBorderedTouchable} from '../../Touchable/Touchable.component';
import {noop} from 'lodash';
import {View} from 'react-native';

configure({adapter: new ReactSixteenAdapter()});

describe('List component', () => {
  it('should render correctly', () => {
    const progressBarTree = renderer.create(<List />).toJSON();
    expect(progressBarTree).toMatchSnapshot();
  });
  it('should render listItem correctly', () => {
    const wrapper = shallow(<List/>);
    const inst = wrapper.instance();
    const ListItem = inst._listItem({item: {heading: '', subheading: ''}});
    const progressBarTree = renderer.create(ListItem).toJSON();
    expect(progressBarTree).toMatchSnapshot();
  });
  it('should be wrapped around touchable if on press is passed', () => {
    const wrapper = shallow(<List onPress={noop}/>);
    const inst = wrapper.instance();
    const ListItem = shallow(inst._listItem({item: {heading: '', subheading: ''}}));
    expect(ListItem.type()).toEqual(CustomBorderedTouchable);
  });
  it('should be wrapped around view if onpress is not passed', () => {
    const wrapper = shallow(<List/>);
    const inst = wrapper.instance();
    const ListItem = shallow(inst._listItem({item: {heading: '', subheading: ''}}));
    expect(ListItem.instance()).toBeInstanceOf(View);
  });
  it('_keyExtractor: should return the index', () => {
    const wrapper = shallow(<List/>);
    const _keyExtractor = wrapper.instance()._keyExtractor;
    expect(_keyExtractor(null, 1)).toBe(1);
  });
});
