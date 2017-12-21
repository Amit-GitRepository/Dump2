import OTPPrompt from '../OTPPrompt.component';
import React from 'react';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16

describe('OTPPrompt component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<OTPPrompt />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
