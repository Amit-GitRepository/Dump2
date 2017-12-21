import InfoBar from '../InfoBar.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('InfoBar component', () => {
  it('should renders correctly', () => {
    const componentTree = renderer.create(<InfoBar text={'Hello, I am InfoBar.'}/>).toJSON();
    expect(componentTree).toMatchSnapshot();
  });
});
