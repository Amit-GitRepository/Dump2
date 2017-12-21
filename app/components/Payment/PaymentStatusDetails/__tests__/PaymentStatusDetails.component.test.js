import PaymentStatusDetails from '../PaymentStatusDetails.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure} from 'enzyme';

jest.mock('../../../../utils/moment.util', () => {
  var m = require('moment');
  return () => m('2017-11-25');
});

configure({adapter: new ReactSixteenAdapter()});

describe('PaymentStatusDetails component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<PaymentStatusDetails onFormSubmit={jest.fn} />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
