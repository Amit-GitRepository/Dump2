import PaymentCardForm from '../PaymentCardForm.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('PaymentCardForm component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<PaymentCardForm onFormSubmit={jest.fn} amount={10000}/>).toJSON();
    expect(component).toMatchSnapshot();
  });
});
