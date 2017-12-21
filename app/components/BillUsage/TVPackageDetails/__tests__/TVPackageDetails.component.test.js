import React from 'react';
import renderer from 'react-test-renderer';
import TVPackageDetails from '../TVPackageDetails.component'; // Enzyme

describe('TVPackagDetail card', () => {
  const packageInfo = {
    'name': 'VGSPF01P001',
    'description': 'Sport Family HD'
  };

  const packageDetails = {
    'packageName': 'Sport Family HD',
    'price': 590,
    'channelCountHD': 19,
    'channelCountSD': 72,
    'imageURL': 'https://cms.dmpcdn.com/iservice_v2/TVS_PACKAGE/TVS_SportFamilyHD_en.png'
  };

  const productId = '123444';

  it('renders correctly', () => {
    const component = renderer.create(<TVPackageDetails packageDetails = {packageDetails} packageInfo = {packageInfo} productId={productId}/>);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly when packageDetails is empty', () => {
    const component = renderer.create(<TVPackageDetails packageDetails = {{}} packageInfo = {packageInfo} productId={productId}/>);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly when packageInfo is empty', () => {
    const component = renderer.create(<TVPackageDetails packageDetails = {packageDetails} packageInfo = {{}} productId={productId}/>);
    expect(component).toMatchSnapshot();
  });
});
