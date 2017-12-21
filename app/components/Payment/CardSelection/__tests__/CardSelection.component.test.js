import CardSelection from '../CardSelection.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('CardSelection component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<CardSelection onFormSubmit={jest.fn} />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
