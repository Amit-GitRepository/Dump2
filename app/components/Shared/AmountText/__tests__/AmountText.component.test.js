import AmountText from '../AmountText.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('AmountText component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<AmountText />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
