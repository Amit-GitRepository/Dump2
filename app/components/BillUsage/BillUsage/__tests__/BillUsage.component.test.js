import BillUsage from '../BillUsage.component';
import React from 'react'; // Enzyme adapter for React 16
import renderer from 'react-test-renderer';

jest.mock('../../../../utils/moment.util', () => {
  var m = require('moment');
  return () => m('1-1-1990');
});

describe('BillUsage component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<BillUsage />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
