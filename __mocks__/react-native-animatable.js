import React from 'react';
import {View} from 'react-native';

module.exports = {
  View,
  createAnimatableComponent: jest.fn((component) => component),
  initializeRegistryWithDefinitions: jest.fn()
};
