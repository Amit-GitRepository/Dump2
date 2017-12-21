import PaymentCard from '../PaymentCard.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('PaymentCard component', () => {
  it('renders correctly', () => {
    const savedCards = {cards: []};
    const component = renderer.create(<PaymentCard onFormSubmit={jest.fn} savedCards={savedCards}/>).toJSON();
    expect(component).toMatchSnapshot();
  });
});
