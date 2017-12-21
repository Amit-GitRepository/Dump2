import RadioGroup from '../RadioGroup.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const radioGroupData = [{
  label: 'first',
  value: '1'
}, {
  label: 'seco',
  value: '2'
}, {
  label: 'Third',
  value: '3'
}];

describe('RadioGroup component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<RadioGroup radioGroupData={radioGroupData}/>).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('renders correctly RadioGroup with radio group data', () => {
    const wrapper = shallow(<RadioGroup radioGroupData={radioGroupData}/>);
    expect(wrapper).toBeDefined();
  });
  it('should have selected as index of initialValue initially', () => {
    const wrapper = shallow(<RadioGroup radioGroupData={radioGroupData} initialValue='1'/>);
    expect(wrapper.state().selected).toBe('');
  });
  it('should have selected as index of selected radio button is clicked', () => {
    const wrapper = shallow(<RadioGroup radioGroupData={radioGroupData} onChange={jest.fn}/>);
    wrapper.instance().radioSelect('2');
    expect(wrapper.state().selected).toBe('2');
  });
  it('should have selected as index of selected radio button is clicked', () => {
    const nextProps = {
      showDefaultValue: true
    };
    const wrapper = shallow(<RadioGroup radioGroupData={radioGroupData} showDefaultValue={false}/>);
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state().selected).toBe('1');
  });
});
