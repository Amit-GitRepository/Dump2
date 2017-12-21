import PaymentOptions from '../PaymentOptions.component';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

describe('PaymentOptions component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<PaymentOptions onFormSubmit={jest.fn} />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('onRadioSelect: should set the paymentMethod value', () => {
    const wrapper = shallow(<PaymentOptions />);
    const instance = wrapper.instance();
    instance.onRadioSelect('card')();
    expect(wrapper.state().paymentMethod).toBe('card');
  });
});
