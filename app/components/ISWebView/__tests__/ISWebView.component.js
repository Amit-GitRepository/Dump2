import ISWebView from '../ISWebView.component';
import React from 'react';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16

describe('ISWebView component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<ISWebView />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
