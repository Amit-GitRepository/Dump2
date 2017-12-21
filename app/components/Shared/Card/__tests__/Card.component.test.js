import Card from '../Card.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Card component', () => {
  it('should renders correctly', () => {
    const componentTree = renderer.create(<Card/>).toJSON();
    expect(componentTree).toMatchSnapshot();
  });
});
