import result from 'lodash/result';
import {addAttributesToBillDetails, addAttributesToProducts} from '../../utils/storeList.util';
import * as actions from '../actions/index.actions';

const initialState = {
  product: {},
  billDetail: {},
  serviceNo: ''
};

export default function payForOthers (state = initialState, action) {
  switch (action.type) {
  case actions.SET_PRODUCTS_PAYMENT: {
    const {serviceNo} = action.payload;
    const productList = result(action.payload, 'products', {});
    let productToStore;
    Object.keys(productList).forEach((prodcutType) => {
      if (productList[prodcutType].length > 0) {
        productToStore = addAttributesToProducts(productList[prodcutType])[0];
      }
    });
    return {
      ...state,
      product: productToStore, serviceNo
    };
  }

  case actions.SET_PAYOTHERS_PRODUCT_COLLAPSE_STATUS: {
    const {isCollapsed} = action.payload;
    return {...state, product: {...state.product, isCollapsed}};
  }

  case actions.TOGGLE_PAYOTHERS_PRODUCT_CHECK_STATUS: {
    const toggledCheck = !state.product.isChecked;
    return {...state, product: {...state.product, isChecked: toggledCheck}};
  }

  case actions.SET_PAYOTHERS_PRODUCT_BILL_DETAIL: {
    const {data} = action.payload;
    const accountId = Object.keys(data)[0];
    const modifiedBillDetail =  addAttributesToBillDetails(data[accountId]);
    return {...state, billDetail: {...state.billDetail, [accountId]: modifiedBillDetail}};
  }
  case actions.TOGGLE_PAYOTHERS_BILL_DETAIL_CHECK_STATUS: {
    const {accountId, invoiceNos, isChecked, checkedBillSum} = action.payload;
    const billDetails = result(state.billDetail, `${accountId}`, []);
    const billDetailsModified = billDetails.map((bill) => {
      if (invoiceNos.includes(bill.invoiceNo)) {
        bill.isChecked = isChecked;
      }
      return bill;
    });
    return {
      ...state, billDetail: {
        ...state.billDetail, [accountId]: billDetailsModified
      }, product: {
        ...state.product, checkedBillSum
      }
    };
  }
  default :
    return state;
  }
}

