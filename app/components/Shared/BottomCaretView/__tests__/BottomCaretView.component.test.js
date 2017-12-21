import BottomCaretView from '../BottomCaretView.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Overlay Spinner component', () => {
  it('should renders correctly', () => {
    const componentTree = renderer.create(<BottomCaretView />).toJSON();
    expect(componentTree).toMatchSnapshot();
  });
});
