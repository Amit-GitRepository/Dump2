import getStore from '../../../redux/store';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import TVPackageDetailsPage, {mapStateToProps} from '../TVPackageDetails.page';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();

describe(('TVPackageDetailsPage'), () => {
  it('renders ', () => {
    const wrapper = shallow(<TVPackageDetailsPage store={store}/>);
    expect(wrapper).toBeDefined();
  });
});

describe(('TVPackageDetailsPage: mapStateToProps'), () => {
  const props = mapStateToProps(store.getState());
  it('productDetail prop to be defined', () => {
    expect(props.productDetail).toBeDefined();
  });
});
