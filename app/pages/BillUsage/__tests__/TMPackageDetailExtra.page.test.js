import getStore from '../../../redux/store';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import TMPackageDetailsExtraPage, {mapStateToProps} from '../TMPackageDetailsExtra.page';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();

describe(('TMPackageDetailsExtraPage'), () => {
  it('renders ', () => {
    const wrapper = shallow(<TMPackageDetailsExtraPage store={store}/>);
    expect(wrapper).toBeDefined();
  });
});

describe(('TMPackageDetailsExtraPage: mapStateToProps'), () => {
  const props = mapStateToProps(store.getState());
  it('productDetail prop to be defined', () => {
    expect(props.productDetail).toBeDefined();
  });
});
