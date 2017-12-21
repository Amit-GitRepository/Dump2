import React from 'react';
import renderer from 'react-test-renderer';
import ResendOTPCounter from '../ResendOTPCounter.component'; // Enzyme adapter for React 16

describe('ResendOTPCounter component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<ResendOTPCounter />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
