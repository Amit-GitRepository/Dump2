import Dropdown from '../Dropdown.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('Dropdown component', () => {
  it('should render correctly', () => {
    const componentTree = renderer.create(<Dropdown />).toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  it('should set isVisible in state to true if showModal is called', () => {
    const wrapper = shallow(<Dropdown/>);
    wrapper.setState({isVisible: false});
    wrapper.instance().showModal();
    expect(wrapper.instance().state).toEqual({isVisible: true});
  });

  it('should set isVisible in state to false', () => {
    const wrapper = shallow(<Dropdown/>);
    wrapper.setState({isVisible: true});
    wrapper.instance().hideModal();
    expect(wrapper.instance().state).toEqual({isVisible: false});
  });

  it('should set isVisible in state to false when selectItem is called', () => {
    const wrapper = shallow(<Dropdown onSelect={jest.fn()}/>);
    wrapper.setState({isVisible: true});
    wrapper.instance().selectItem('test')();
    expect(wrapper.instance().state).toEqual({isVisible: false});
  });

  it('should set isVisible in state to false when selectItem is called', () => {
    const onSelect = jest.fn((val) => val);
    const wrapper = shallow(<Dropdown onSelect={onSelect}/>);
    wrapper.setState({isVisible: true});
    wrapper.instance().selectItem('test')();
    expect(onSelect).toHaveBeenCalledWith('test');
  });
});
