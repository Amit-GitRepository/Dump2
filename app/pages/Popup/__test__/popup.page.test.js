import getStore from '../../../redux/store';
import Popup, {mapDispatchToProps, mapStateToProps} from '../Popup.page';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();
const dispatch = jest.fn();

describe(('Popup'), () => {
  it('renders ', () => {
    const wrapper = shallow(<Popup store={store}/>);
    expect(wrapper).toBeDefined();
  });
});

describe(('Popup: mapStateToProps'), () => {
  const props = mapStateToProps(store.getState());
  it('message prop to be defined', () => {
    expect(props.message).toBeDefined();
  });
  it('isOpen prop to be defined', () => {
    expect(props.isOpen).toBeDefined();
  });
});

describe(('Popup: mapDispatchToProps'), () => {
  const props = mapDispatchToProps(dispatch);
  it('hidePopup prop to be defined', () => {
    expect(props.hidePopup).toBeDefined();
  });
  it('popupPutAction prop to be defined', () => {
    expect(props.popupPutAction).toBeDefined();
  });
});
