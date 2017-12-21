import CircularAccordianButton from '../CircularAccordianButton.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('CircularAccordianButton component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<CircularAccordianButton />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
