import React from 'react';
import renderer from 'react-test-renderer';
import StoreDetailItem from '../StoreDetailItem.component';

describe('StoreDetailItem component', () => {
  it('StoreDetailItem: return null if heading or label is not passed', () => {
    const tree = renderer.create(<StoreDetailItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StoreDetailItem: renders correctly if heading and label is passed', () => {
    const tree = renderer.create(<StoreDetailItem heading='heading' label='label'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
