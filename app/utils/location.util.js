import compact from 'lodash/compact';
import geolib from 'geolib';
import {Toast} from './reactNative.util.js';
import {translate} from '../language/i18n/helper';

export const sortByDistance = (currentLatLong, coordinates, limit = -1) => {
  const sortedMatrix = geolib.orderByDistance(currentLatLong, coordinates);
  const parseCoordinates = (coordinate) => {
    const distance = parseFloat((coordinate.distance / 1000).toFixed(2));
    if (limit === -1 || distance <= limit) {
      return {...coordinates[coordinate.key], distance: distance};
    }
    return null;
  };
  return compact(sortedMatrix.map(parseCoordinates));
};

export const getCurrentPosition = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(function (pos) {
    resolve({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    });
  }, (err) => {
    Toast.show(translate('LOCATION_ACCESS_DISABLED'));
    reject(err);
  });
});
