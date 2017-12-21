import result from 'lodash/result';

export const addAttributesToProducts = (productList) => {
  const list = productList.map((eachProduct) => ({
    ...eachProduct,
    balance: parseFloat(eachProduct.balance) || 0.0,
    isChecked: parseFloat(eachProduct.balance) > 0,
    isCollapsed: true,
    checkedBillSum: parseFloat(eachProduct.balance) || 0.0
  }));
  return list;
};

export const addAttributesToConvergenceProducts = (productList) => {
  const list = productList.map((eachProduct) => ({
    ...eachProduct,
    balance: parseFloat(eachProduct.balance) || 0.0,
    isChecked: !!parseFloat(eachProduct.balance),
    products: addAttributesToProducts(result(eachProduct, 'products', [])),
    checkedBillSum: parseFloat(eachProduct.balance) || 0.0
  }));
  return list;
};

export const addAttributesToBillDetails = (billDetails) => {
  const list = billDetails.map((bill) => ({
    ...bill,
    isChecked: true
  }));
  return list;
};