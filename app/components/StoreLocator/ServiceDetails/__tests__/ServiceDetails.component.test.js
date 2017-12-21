import React from 'react';
import renderer from 'react-test-renderer';
import ServiceDetails from '../ServiceDetails.component';
import set from 'lodash/set';

describe('ServiceDetails component', () => {
  it('ServiceDetails: renders correctly', () => {
    const navigation = {};
    set(navigation, 'state.params.products', ['SomeProductName']);
    set(navigation, 'state.params.serviceName', 'SomeserviceName');
    const tree = renderer.create(<ServiceDetails navigation={navigation}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
