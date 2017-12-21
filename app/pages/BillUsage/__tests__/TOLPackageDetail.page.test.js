import getStore from '../../../redux/store';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import TOLPackageDetailsPage, {mapStateToProps} from '../TOLPackageDetails.page';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();

describe(('TOLPackageDetailsPage'), () => {
  it('renders ', () => {
    const wrapper = shallow(<TOLPackageDetailsPage store={store}/>);
    expect(wrapper).toBeDefined();
  });
});

describe(('TOLPackageDetailsPage: mapStateToProps'), () => {
  const props = mapStateToProps(store.getState());
  it('productDetail prop to be defined', () => {
    expect(props.productDetail).toBeDefined();
  });
});
