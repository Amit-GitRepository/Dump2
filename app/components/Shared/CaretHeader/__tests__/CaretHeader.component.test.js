import CaretHeader from '../CaretHeader.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('CaretHeader component', () => {
  it('should render correctly', () => {
    const componentTree = renderer.create(<CaretHeader />).toJSON();
    expect(componentTree).toMatchSnapshot();
  });
});
