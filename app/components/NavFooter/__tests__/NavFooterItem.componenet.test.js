import NavFooterItem from '../NavFooterItem.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('NavFooterItem component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<NavFooterItem/>);
    const component = renderer.create(<NavFooterItem />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
  it('navigateToScreen: navigate to screen to be called', () => {
    const goToScreenMock = jest.fn();
    const wrapper = shallow(<NavFooterItem goToScreen={goToScreenMock}/>);
    wrapper.instance().navigateToScreen('test')();
    expect(goToScreenMock).toHaveBeenCalledWith('test');
  });
});
