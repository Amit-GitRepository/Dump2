import BillUsage, {mapDispatchToProps, mapStateToProps} from '../BillUsage.page';
import getStore from '../../../redux/store';
import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

const store = getStore();
const dispatch = jest.fn();

describe(('BillUsagePage'), () => {
  it('renders ', () => {
    const wrapper = shallow(<BillUsage store={store}/>);
    expect(wrapper).toBeDefined();
  });
});

describe(('BillUsagePage: mapStateToProps'), () => {
  const props = mapStateToProps(store.getState());
  it('username prop to be defined', () => {
    expect(props.username).toBeDefined();
  });
  it('productList prop to be defined', () => {
    expect(props.productList).toBeDefined();
  });
  it('productDetail prop to be defined', () => {
    expect(props.productDetail).toBeDefined();
  });
  it('billDetail prop to be defined', () => {
    expect(props.billDetail).toBeDefined();
  });
});
// goToScreen: (screenName, params = {}) => dispatch(NavigationActions.navigate({routeName: screenName, params})),
// getProductList: () => dispatch(actions.getBillUsageProductList()),
// getProductBillDetails: (productType, subscriberId) => dispatch(actions.getBillUsageProductBillDetail({productType, subscriberId})),
// toggleProductCheck: (productType, subscriberId) => dispatch(actions.toggleBillUsageProductCheckStatus({productType, subscriberId})),
// toggleProductCollapse: (productType, subscriberId) => dispatch(actions.toggleBillUsageProductCollapseStatus({productType, subscriberId}))

describe(('BillUsagePage: mapDispatchToProps'), () => {
  const props = mapDispatchToProps(dispatch);
  it('goToScreen prop to be defined', () => {
    expect(props.goToScreen).toBeDefined();
  });
  it('getProductBillDetails prop to be defined', () => {
    expect(props.getProductBillDetails).toBeDefined();
  });
  it('toggleProductCheck prop to be defined', () => {
    expect(props.toggleProductCheck).toBeDefined();
  });
  it('toggleProductCollapse prop to be defined', () => {
    expect(props.toggleProductCollapse).toBeDefined();
  });
  it('setPaymentItems prop to be defined', () => {
    expect(props.setPaymentItems).toBeDefined();
  });
});
