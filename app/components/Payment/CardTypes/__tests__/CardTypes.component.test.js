import CardTypes from '../CardTypes.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('CardTypes component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<CardTypes />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
