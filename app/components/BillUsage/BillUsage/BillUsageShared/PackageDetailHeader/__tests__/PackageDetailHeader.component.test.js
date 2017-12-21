import PackageDetailHeader from '../PackageDetailHeader.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('PackageDetailHeader component', () => {
  it('renders correctly with props', () => {
    const mockData = {name: 'test', phoneNumber: '9629770174', billCycle: {code: '10'}};
    const component = renderer.create(<PackageDetailHeader phoneNumber = {mockData.phoneNumber} endDate ={mockData.endDate} name = {mockData.name}/>);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly without props', () => {
    const component = renderer.create(<PackageDetailHeader/>);
    expect(component).toMatchSnapshot();
  });
});
