import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import StoreLocatorMap from '../StoreLocatorMap.component';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('StoreLocatorMap component', () => {
  const initialRegion = {
    latitude: 12.9142059,
    longitude: 77.6820747,
    latitudeDelta: 0.012,
    longitudeDelta: 0.034
  };
  it('should render correctly', () => {
    const componentTree = renderer.create(<StoreLocatorMap initialRegion={initialRegion}/>).toJSON();
    expect(componentTree).toMatchSnapshot();
  });
  it('addStoreMarker: should curry props.addStoreMarker', () => {
    const wrapper = shallow(<StoreLocatorMap />);
    const props = {addStoreMarker: jest.fn()};
    wrapper.setProps(props);
    wrapper.instance().addStoreMarker({name: 'someStoreName'})();
    expect(props.addStoreMarker).toBeCalledWith({name: 'someStoreName'});
  });
});
