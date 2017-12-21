import PackageOverview from '../PackageOverview.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('PackageOverview component', () => {
  it('renders correctly', () => {
    const mockTitle = 'title';
    const mocksubTitle = 'sub title';
    const component = renderer.create(<PackageOverview title = {mockTitle} subTitle = {mocksubTitle}/>);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly without props', () => {
    const component = renderer.create(<PackageOverview/>);
    expect(component).toMatchSnapshot();
  });
});