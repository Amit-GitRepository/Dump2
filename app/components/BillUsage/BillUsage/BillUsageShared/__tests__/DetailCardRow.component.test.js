import DetailCardRow from '../DetailCardRow.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';

describe('DetailCardRow Component', () => {
  it('renders correctly when all values are passed to it', () => {
    const component = renderer.create(<DetailCardRow rowData = {{consumedValue: '250', unit: 'MB', subtext: 'out of 30 GB'}}  type='voice' iconSize = {50}/>).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('renders correctly when no values are passed to the component', () => {
    const component = renderer.create(<DetailCardRow/>).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('renders correctly when partial values are passed to the component', () => {
    const component = renderer.create(<DetailCardRow rowData = {{consumedValue: '250', unit: 'MB'}}  iconSize = {50} type='voice'/>);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly with different styles passed to the component', () => {
    const component = renderer.create(<DetailCardRow rowData = {{consumedValue: '250', unit: 'MB'}} consumedValueStyle = {{fontSize: 80}} unitStyle = {{fontSize: 80}} subtextStyle = {{fontSize: 80}} type='voice'/>);
    expect(component).toMatchSnapshot();
  });
});
