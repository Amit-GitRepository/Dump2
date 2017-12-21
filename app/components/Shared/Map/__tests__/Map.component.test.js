import Map from '../Map.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16
import shopMarker from '../../../../assets/shopMarker.png';
import {configure, shallow} from 'enzyme';
import {Image} from 'react-native';
import {Marker} from 'react-native-maps';

configure({adapter: new ReactSixteenAdapter()});
const initialRegion = {
  latitude: 12.9142059,
  longitude: 77.6820747,
  latitudeDelta: 0.012,
  longitudeDelta: 0.034
};
describe('Map component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Map initialRegion={initialRegion}/>);
    const component = renderer.create(<Map/>).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });

  it('should render markers inside map if markerList is passed', () => {
    const markerList = [
      {
        latitude: 12.9142059,
        longitude: 77.6820747,
        name: {
          'en': 'some shop',
          'th': 'some shop (th)'
        }
      }
    ];
    const wrapper = shallow(<Map initialRegion={initialRegion} markerList={markerList} language={'en'}/>);
    const component = renderer.create(<Map initialRegion={initialRegion} markerList={markerList} language={'en'}/>).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });

  it('should render map with the initial region if initialRegion is passed', () => {
    const wrapper = shallow(<Map initialRegion={initialRegion}/>);
    const component = renderer.create(<Map initialRegion={initialRegion}/>).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });

  it('addMarker: should return Marker component when marker array is passed', () => {
    const markerList = [
      {
        latitude: 12.9142059,
        longitude: 77.6820747,
        name: {
          'en': 'some shop',
          'th': 'some shop (th)'
        }
      }
    ];
    const wrapper = shallow(<Map initialRegion={initialRegion} markerList={markerList} language={'en'} onCalloutPress={jest.fn()}/>);
    const marker = [<Marker key={0}
      coordinate={{latitude: 12.9142059, longitude: 77.6820747, name: {'en': 'some shop', 'th': 'some shop (th)'}}} title={'some shop'}>
      <Image
        style={{width: 30, height: 40}}
        source={shopMarker}
      />
    </Marker>];
    expect(wrapper.instance().addMarker(markerList)).toEqual(marker);
  });

  it('addMarker: should return empty array when empty markerList array is passed', () => {
    const markerList = [];
    const wrapper = shallow(<Map initialRegion={initialRegion} markerList={markerList}/>);
    const marker = [];
    expect(wrapper.instance().addMarker(markerList)).toEqual(marker);
  });

  it('showCurrentLocation: should update map region to current location', () => {
    const currentLocation = {
      latitude: 10.12345,
      longitude: 70.123457,
      latitudeDelta: 0.098,
      longitudeDelta: 0.076
    };

    const map = {
      _root: {animateToRegion: jest.fn()}
    };

    const wrapper = shallow(<Map initialRegion={initialRegion} currentLocation={currentLocation} onPressCurrLocation={jest.fn()}/>);
    wrapper.instance().setRef(map);
    wrapper.instance().showCurrentLocation();
    expect(map._root.animateToRegion).toHaveBeenCalled();
  });

  it('componentDidUpdate: should update map region to the initial region prop', () => {
    const currentLocation = {
      latitude: 10.12345,
      longitude: 70.123457,
      latitudeDelta: 0.098,
      longitudeDelta: 0.076
    };

    const map = {
      _root: {animateToRegion: jest.fn()}
    };

    const wrapper = shallow(<Map initialRegion={initialRegion} currentLocation={currentLocation} onPressCurrLocation={jest.fn()}/>);
    wrapper.instance().setRef(map);
    wrapper.instance().componentDidUpdate({initialRegion: currentLocation});
    expect(map._root.animateToRegion).toHaveBeenCalled();
  });
});
