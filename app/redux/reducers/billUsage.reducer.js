import result from 'lodash/result';
import {addAttributesToBillDetails, addAttributesToConvergenceProducts, addAttributesToProducts} from '../../utils/storeList.util';
import {
  LOGOUT_SUCCESS, RESET_PREPAY, SET_BILL_USAGE_PRODUCT_BILL_DETAIL,
  SET_BILL_USAGE_PRODUCT_COLLAPSE_STATUS, SET_BILL_USAGE_PRODUCT_DETAIL, SET_BILL_USAGE_PRODUCT_LIST,
  TOGGLE_BILL_DETAIL_CHECK_STATUS, TOGGLE_BILL_USAGE_PRODUCT_CHECK_STATUS
} from '../actions/index.actions';

const initialState = {
  productList: {
    'tmhPostpaid': [], // True Move H postpaid
    'tol': [], // true online
    'tvs': [],  // true vision
    'conv': [],  // true convergence
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

export default function billUsage (state = initialState, action) {
  switch (action.type) {
  case SET_BILL_USAGE_PRODUCT_LIST : {
    const tmhPostpaid = addAttributesToProducts(result(action, 'payload.tmhPostpaid', []));
    const tol = addAttributesToProducts(result(action, 'payload.tol', []));
    const tvs = addAttributesToProducts(result(action, 'payload.tvs', []));
    const conv = addAttributesToConvergenceProducts(result(action, 'payload.conv', []));
    const tmhPrepaid = addAttributesToProducts(result(action, 'payload.tmhPrepaid', []));
    return {
      ...state,
      productList: {
        'tmhPostpaid': tmhPostpaid,
        'tol': tol,
        'tvs': tvs,
        'conv': conv,
        'tmhPrepaid': tmhPrepaid
      }
    };
  }

  case SET_BILL_USAGE_PRODUCT_COLLAPSE_STATUS: {
    const {productType, subscriberId, isCollapsed, convBundleName} = action.payload;
    const productKey = convBundleName ? 'conv' : productType;
    const productGroupList = state.productList[productKey] || [];
    const updatedProductGroupList = productGroupList.map((eachProduct) => {
      if (convBundleName && eachProduct.bundle === convBundleName) {
        const products = eachProduct.products.map((convProduct) => {
          if (convProduct.subscriberId === subscriberId) {
            return {...convProduct, isCollapsed};
          } else {
            return convProduct;
          }
        });
        return {...eachProduct, products};
      } else if (eachProduct.subscriberId === subscriberId) {
        return {...eachProduct, isCollapsed};
      }
      return eachProduct;
    });
    return {...state, productList: {...state.productList, [productKey]: updatedProductGroupList}};
  }

  case TOGGLE_BILL_USAGE_PRODUCT_CHECK_STATUS: {
    const {productType, subscriberId, bundle} = action.payload;
    const productGroupList = state.productList[productType] || [];
    const updatedProductGroupList = productGroupList.map((eachProduct) => {
      if (productType === 'tmhPrepaid') {
        eachProduct.isChecked = false;
      } else if (productType === 'conv') {
        if (eachProduct.bundle === bundle) {
          eachProduct.isChecked = !eachProduct.isChecked;
        }
      } else if (eachProduct.subscriberId === subscriberId) {
        eachProduct.isChecked = !eachProduct.isChecked;
      }
      return {...eachProduct};
    });
    return {...state, productList: {...state.productList, [productType]: updatedProductGroupList}};
  }

  case TOGGLE_BILL_DETAIL_CHECK_STATUS: {
    const {accountId, invoiceNos, isChecked, checkedBillSum, bundle} = action.payload;
    const productKey = action.payload.productType === 'conv' ? bundle : accountId;
    const billDetails = result(state.billDetail, `${action.payload.productType}.${productKey}`, []);
    const productList = result(state.productList, `${action.payload.productType}`, []);
    const productListModified = productList.map((product) => {
      if (action.payload.productType === 'conv') {
        if (product.bundle === bundle) {
          product.checkedBillSum = checkedBillSum;
        }
      } else if (product.accountId === accountId) {
        product.checkedBillSum = checkedBillSum;
      }
      return product;
    });
    const billDetailsModified = billDetails.map((bill) => {
      if (invoiceNos.includes(bill.invoiceNo)) {
        bill.isChecked = isChecked;
      }
      return bill;
    });
    return {
      ...state, billDetail: {
        ...state.billDetail, [action.payload.productType]: {
          ...state.billDetail[action.payload.productType], [productKey]: billDetailsModified
        }
      }, productList: {
        ...state.productList, [action.payload.productType]: productListModified
      }
    };
  }
  case SET_BILL_USAGE_PRODUCT_DETAIL: {
    const {productType, subscriberId, data} = action.payload;
    const productGroup = {...state.productDetail[productType] || {}};
    productGroup[subscriberId] = data;
    return {...state, productDetail: {...state.productDetail, [productType]: productGroup}};
  }

  case SET_BILL_USAGE_PRODUCT_BILL_DETAIL: {
    const {productType, data, bundle} = action.payload;
    const accountId = Object.keys(data);
    const productGroup = {...state.billDetail[productType] || {}};
    const productKey = bundle ? bundle : accountId;
    productGroup[productKey] = data[accountId] ? addAttributesToBillDetails(data[accountId]) : [];
    return {...state, billDetail: {...state.billDetail, [productType]: productGroup}};
  }

  case LOGOUT_SUCCESS: {
    return initialState;
  }

  case RESET_PREPAY: {
    return initialState;
  }

  default :
    return state;
  }
}
