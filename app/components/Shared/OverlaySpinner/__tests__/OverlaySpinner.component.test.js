import OverlaySpinner from '../OverlaySpinner.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Overlay Spinner component', () => {
  it('should render spinner when showSpinner positive', () => {
    const progressBarTree = renderer.create(<OverlaySpinner showSpinner={1}/>).toJSON();
    expect(progressBarTree).toMatchSnapshot();
  });
  it('should render nothing when showSpinner positive', () => {
    const progressBarTree = renderer.create(<OverlaySpinner showSpinner={0}/>).toJSON();
    expect(progressBarTree).toMatchSnapshot();
  });
});
