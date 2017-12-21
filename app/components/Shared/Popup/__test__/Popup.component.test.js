import Popup from '../Popup.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('Popup component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Popup />);
    const component = renderer.create(<Popup />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
  it('hidePopupAndCallAction: sets actionObject', () => {
    const wrapper = shallow(<Popup />);
    wrapper.setState({actionObject: {title: 'hello'}});
    wrapper.instance().hidePopupAndCallAction();
    expect(wrapper.instance().state.actionObject).toEqual({title: 'hello'});
  });
  it('callAction: popupPutActionMock to be called', () => {
    const popupPutActionMock = jest.fn();
    const wrapper = shallow(<Popup
      isOpen={true}
      popupPutAction={popupPutActionMock}
      message={{
        title: 'SIDE_MENU__LOGIN_PROMPT_TITLE_TEXT',
        body: 'SIDE_MENU__LOGIN_PROMPT_NEED_ACCESS',
        buttons: [
          {
            title: 'SIDE_MENU__LOGIN_PROMPT_LOGIN',
            actionType: 'LOGIN_REQUEST',
            nextAction: null
          }
        ]
      }} />);
    wrapper.setState({actionObject: {
      title: 'SIDE_MENU__LOGIN_PROMPT_LOGIN',
      actionType: 'LOGIN_REQUEST',
      nextAction: null
    }});
    wrapper.instance().callAction();
    expect(popupPutActionMock).toHaveBeenCalledWith({'payload': null, 'type': 'LOGIN_REQUEST'});
  });
  it('callAction: popupPutActionMock to not be called', () => {
    const popupPutActionMock = jest.fn();
    const wrapper = shallow(<Popup />);
    wrapper.setState({actionObject: {}});
    wrapper.instance().callAction();
    expect(popupPutActionMock).not.toHaveBeenCalledWith({'type': 'test'});
  });
});
