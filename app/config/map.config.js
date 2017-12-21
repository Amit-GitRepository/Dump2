const mapConfig = {
  initialRegion: {
    latitude: 13.7628754,
    longitude: 100.5658374,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3
  },
  defaultZoom: {
    location: {
      latitudeDelta: 0.3,
      longitudeDelta: 0.3
    },
    province: {
      latitudeDelta: 0.5,
      longitudeDelta: 0.5
    }
  },
  distanceLimit: {
    currentLocation: 15,
    province: 50
  }
};

export default mapConfig;
