import {getCurrentPosition, sortByDistance} from '../location.util';

describe('Location utility', () => {
  it('sortByDistance: Should sort the distances based on lat-longs from currentLatLong', () => {
    const storesData = [{latitude: 15.299326, longitude: 74.123996}, // GOA
      {latitude: 33.778175, longitude: 76.576171}, // KASHMIR
      {latitude: 28.704059, longitude: 77.102490}, // DELHI
      {latitude: 19.075984, longitude: 72.877656}]; // MUMBAI

    const currentLatLong = { // Bangalore
      'latitude': 12.971599,
      'longitude': 77.594563
    };
    const expected = [{latitude: 15.299326, longitude: 74.123996, 'distance': 454.66}, // GOA
      {latitude: 19.075984, longitude: 72.877656, 'distance': 843.11}, // MUMBAI
      {latitude: 28.704059, longitude: 77.102490, 'distance': 1742.65}, // DELHI
      {latitude: 33.778175, longitude: 76.576171, 'distance': 2306.80}]; // KASHMIR
    expect(sortByDistance(currentLatLong, storesData)).toEqual(expected);
  });

  it('sortByDistance: Should return the sorted distances within the limit if limit is passed', () => {
    const storesData = [{latitude: 15.299326, longitude: 74.123996}, // GOA
      {latitude: 33.778175, longitude: 76.576171}, // KASHMIR
      {latitude: 28.704059, longitude: 77.102490}, // DELHI
      {latitude: 19.075984, longitude: 72.877656}]; // MUMBAI

    const currentLatLong = { // Bangalore
      'latitude': 12.971599,
      'longitude': 77.594563
    };
    const expected = [{latitude: 15.299326, longitude: 74.123996, 'distance': 454.66}, // GOA
      {latitude: 19.075984, longitude: 72.877656, 'distance': 843.11}]; // MUMBAI
    expect(sortByDistance(currentLatLong, storesData, 1000)).toEqual(expected);
  });

  it('getCurrentPosition: should return correct coordinates of current location', async () => {
    global.navigator = {
      geolocation: {
        getCurrentPosition: jest.fn(function (position) {
          position({
            coords: {latitude: 10.234, longitude: 20.765}
          });
        })
      }
    };
    const position = await getCurrentPosition();
    expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    expect(position).toEqual({latitude: 10.234, longitude: 20.765});
  });

  it('getCurrentPosition: should handle the error', async () => {
    global.navigator = {
      geolocation: {
        getCurrentPosition: jest.fn(function (successCallback, failureCallback) {
          failureCallback({message: 'someError'});
        })
      }
    };
    const position = await getCurrentPosition().catch((err) => err);
    expect(position).toEqual({message: 'someError'});
  });

});
