export const sortByDistance = jest.fn((latlng, data) => data);

export const getCurrentPosition = jest.fn(() => new Promise((resolve) => {
  resolve({
    latitude: 12,
    longitude: 56
  });
}));

export const getAddress = jest.fn(() => 'someAddress');

export const getProducts = jest.fn(() => []);
