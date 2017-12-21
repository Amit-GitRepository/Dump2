import React from 'react';
import renderer from 'react-test-renderer';
import TOLPackageDetails from '../TOLPackageDetails.component'; // Enzyme

describe('TOLPackageDetails component', () => {
  it('renders correctly', () => {
    const mockData = {
      'PRICE_PLAN_INFO': {
        'name': 'BB9D31RQBB31',
        'description': 'BB9 - TrueSmartChoice 3PQ2 2017'
      },
      'TOL_SPEEDS': {
        'pricePlanDetails': {
          'productId': '9101086216',
          'uploadSpeed': 0,
          'downloadSpeed': 0,
          'unit': 'MBPS'
        }
      }
    };
    const component = renderer.create(<TOLPackageDetails packageDetails = {mockData.TOL_SPEEDS.pricePlanDetails}
      packageInfo={mockData.PRICE_PLAN_INFO}/>);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with no props', () => {
    const component = renderer.create(<TOLPackageDetails/>);
    expect(component).toMatchSnapshot();
  });
});
