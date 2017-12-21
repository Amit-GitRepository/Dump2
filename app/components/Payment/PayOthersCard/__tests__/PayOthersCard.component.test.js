import PayOthersCard from '../PayOthersCard.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('PayOthersCard component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<PayOthersCard />);
    expect(component).toMatchSnapshot();
  });
});
