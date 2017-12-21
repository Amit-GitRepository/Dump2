import EBillEdit from '../EBillEdit.component';
import React from 'react';
import renderer from 'react-test-renderer'; // Enzyme adapter for React 16

describe('EBillEdit component', () => {
  it('renders correctly SMS tmhPostpaid account', () => {
    const component = renderer.create(
      <EBillEdit
        productId='9876543210'
        defaultMSISDN='9876543210'
        billingFormat='SMS'
        accountType='tmhPostpaid'
      />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('renders correctly EMAIL tmhPostpaid account', () => {
    const component = renderer.create(
      <EBillEdit
        productId='9876543210'
        defaultMSISDN='abc@gmail.com'
        billingFormat='EMAIL'
        accountType='tmhPostpaid'
      />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('renders correctly EMAIL tol account', () => {
    const component = renderer.create(
      <EBillEdit
        productId='9876543210'
        defaultMSISDN='abc@gmail.com'
        billingFormat='EMAIL'
        accountType='tol'
      />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('renders correctly SMS tol account', () => {
    const component = renderer.create(
      <EBillEdit
        productId='9876543210'
        defaultMSISDN='abc@gmail.com'
        billingFormat='EMAIL'
        accountType='tol'
      />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
