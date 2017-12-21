import HeaderWithCaret from '../HeaderWithCaret.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('BillHistoryList component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<HeaderWithCaret />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
