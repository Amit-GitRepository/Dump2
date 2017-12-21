import billUsage from '../billUsage.reducer';
import * as actions from '../../actions/index.actions';

describe('BillUsage reducer', () => {
  const initialState = {
    productList: {
      'tmhPostpaid': [], // True Move H postpaid
      'tol': [], // true online
      'tvs': [], // true vision
      'conv': [], // true convergence
      'tmhPrepaid': [] // prepaid
    },
    productDetail: {
      'tmhPostpaid': {},
      'tol': {},
      'tvs': {},
      'tmhPrepaid': {},
      'conv': {}
    },
    billDetail: {
      'tmhPostpaid': {},
      'tol': {},
      'tvs': {},
      'tmhPrepaid': {},
      'conv': {}
    }
  };
  // check for immutable object
  Object.freeze(initialState);
  it('should have the initial value', () => {
    expect(billUsage(undefined, {})).toEqual(initialState);
  });
  it('should set the value of bill usage product list', () => {
    const action = {
      type: actions.SET_BILL_USAGE_PRODUCT_LIST,
      payload: {
        test: 1
      }
    };
    const state = initialState;
    const result = {
      ...initialState,
      productList: {
        tmhPostpaid: [],
        tol: [],
        tvs: [],
        conv: [],
        tmhPrepaid: []
      }
    };
    expect(billUsage(state, action)).toEqual(result);
  });
  it('should set the value of product Detail of each product of bill usage ', () => {
    const action = {
      type: actions.SET_BILL_USAGE_PRODUCT_DETAIL,
      payload: {
        productType: 'tmhPostpaid',
        subscriberId: 123,
        data: {
          test: 1
        }
      }
    };
    const state = initialState;
    const result = {
      ...initialState,
      productDetail: {
        tmhPostpaid: {
          123: {
            test: 1
          }
        },
        tol: {},
        tvs: {},
        tmhPrepaid: {},
        conv: {}
      }
    };
    expect(billUsage(state, action)).toEqual(result);
  });
  it('should set the value of bill detail of each product of bill usage ', () => {
    const action = {
      type: actions.SET_BILL_USAGE_PRODUCT_BILL_DETAIL,
      payload: {
        productType: 'tol',
        data: {
          123: [
            {
              test2: 1
            }
          ]
        }
      }
    };
    const state = initialState;
    const result = {
      ...initialState,
      billDetail: {
        tol: {
          123: [
            {
              test2: 1,
              isChecked: true
            }
          ]
        },
        tmhPostpaid: {},
        tvs: {},
        conv: {},
        tmhPrepaid: {}
      }
    };
    expect(billUsage(state, action)).toEqual(result);
  });
  it('should toggle isChecked for the specifid bill Object and the ones before it and set the total checked bill amount in the corresponding product when isChecked is true', () => {
    const testAction = {
      type: actions.TOGGLE_BILL_DETAIL_CHECK_STATUS,
      payload: {
        productType: 'ccbsList',
        accountId: '123',
        invoiceNos: ['1234'],
        checkedBillSum: 800,
        isChecked: true
      }
    };
    const {productType, accountId} = testAction.payload;
    const productList = [
      {
        productId: '12456',
        accountId: '123',
        balance: 700,
        subscriberId: '164958',
        statusCode: 'S',
        isChecked: true,
        isCollapsed: false,
        checkedBillSum: 700
      }
    ];
    const billDetail = [
      {
        invoiceNo: '1234',
        dueDate: '2018-04-04T00:00:00.000+07:00',
        billAmount: 2461,
        unpaidAmount: 1230.5,
        invoiceStatus: 'O',
        invoiceCycle: '10/3/2018',
        isChecked: false
      }, {
        invoiceNo: '1234',
        dueDate: '2017-04-04T00:00:00.000+07:00',
        billAmount: 2461,
        unpaidAmount: 1230.5,
        invoiceStatus: 'O',
        invoiceCycle: '10/3/2018',
        isChecked: false
      }
    ];
    const state = {
      ...initialState,
      billDetail: {
        ...initialState.billDetail,
        [productType]: {
          ...initialState.billDetail[productType],
          [accountId]: billDetail
        }
      },
      productList: {
        ...initialState.productList,
        [productType]: productList
      }
    };
    const billDetailModified = [
      {
        invoiceNo: '1234',
        dueDate: '2018-04-04T00:00:00.000+07:00',
        billAmount: 2461,
        unpaidAmount: 1230.5,
        invoiceStatus: 'O',
        invoiceCycle: '10/3/2018',
        isChecked: true
      }, {
        invoiceNo: '1234',
        dueDate: '2017-04-04T00:00:00.000+07:00',
        billAmount: 2461,
        unpaidAmount: 1230.5,
        invoiceStatus: 'O',
        invoiceCycle: '10/3/2018',
        isChecked: true
      }
    ];
    const productListModified = [
      {
        productId: '12456',
        accountId: '123',
        balance: 700,
        subscriberId: '164958',
        statusCode: 'S',
        isChecked: true,
        isCollapsed: false,
        checkedBillSum: 800
      }
    ];
    const result = {
      ...initialState,
      billDetail: {
        ...initialState.billDetail,
        [productType]: {
          ...initialState.billDetail[productType],
          [accountId]: billDetailModified
        }
      },
      productList: {
        ...initialState.productList,
        [productType]: productListModified
      }
    };
    expect(billUsage(state, testAction)).toEqual(result);
  });
  it('should toggle isChecked for the specifid bill Object and the ones after it and set the total checked bill amount in the corresponding product when isChecked is false', () => {
    const testAction = {
      type: actions.TOGGLE_BILL_DETAIL_CHECK_STATUS,
      payload: {
        productType: 'ccbsList',
        accountId: '123',
        invoiceNos: ['1234'],
        checkedBillSum: 800,
        isChecked: false
      }
    };
    const {productType, accountId} = testAction.payload;
    const productList = [
      {
        productId: '12456',
        accountId: '123',
        balance: 700,
        subscriberId: '164958',
        statusCode: 'S',
        isChecked: true,
        isCollapsed: false,
        checkedBillSum: 700
      }
    ];
    const billDetail = [
      {
        invoiceNo: '1234',
        dueDate: '2018-04-04T00:00:00.000+07:00',
        billAmount: 2461,
        unpaidAmount: 1230.5,
        invoiceStatus: 'O',
        invoiceCycle: '10/3/2018',
        isChecked: true
      }, {
        invoiceNo: '1234',
        dueDate: '2017-04-04T00:00:00.000+07:00',
        billAmount: 2461,
        unpaidAmount: 1230.5,
        invoiceStatus: 'O',
        invoiceCycle: '10/3/2018',
        isChecked: true
      }
    ];
    const state = {
      ...initialState,
      billDetail: {
        ...initialState.billDetail,
        [productType]: {
          ...initialState.billDetail[productType],
          [accountId]: billDetail
        }
      },
      productList: {
        ...initialState.productList,
        [productType]: productList
      }
    };
    const billDetailModified = [
      {
        invoiceNo: '1234',
        dueDate: '2018-04-04T00:00:00.000+07:00',
        billAmount: 2461,
        unpaidAmount: 1230.5,
        invoiceStatus: 'O',
        invoiceCycle: '10/3/2018',
        isChecked: false
      }, {
        invoiceNo: '1234',
        dueDate: '2017-04-04T00:00:00.000+07:00',
        billAmount: 2461,
        unpaidAmount: 1230.5,
        invoiceStatus: 'O',
        invoiceCycle: '10/3/2018',
        isChecked: false
      }
    ];
    const productListModified = [
      {
        productId: '12456',
        accountId: '123',
        balance: 700,
        subscriberId: '164958',
        statusCode: 'S',
        isChecked: true,
        isCollapsed: false,
        checkedBillSum: 800
      }
    ];
    const result = {
      ...initialState,
      billDetail: {
        ...initialState.billDetail,
        [productType]: {
          ...initialState.billDetail[productType],
          [accountId]: billDetailModified
        }
      },
      productList: {
        ...initialState.productList,
        [productType]: productListModified
      }
    };
    expect(billUsage(state, testAction)).toEqual(result);
  });
});
