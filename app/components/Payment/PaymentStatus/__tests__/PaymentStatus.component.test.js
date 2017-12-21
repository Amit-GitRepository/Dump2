import PaymentStatus from '../PaymentStatus.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('PaymentStatus component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<PaymentStatus onFormSubmit={jest.fn} />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
