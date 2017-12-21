const paymentConfig = {
  CARD_TYPE: {
    SAVED: 'Saved',
    OTHER: 'Other'
  },
  MAXIMUM_SAVE_CARD_COUNT: 3,
  PAYMENT_STATUS: {
    FAIL: 'FAIL',
    SUCCESS: 'SUCCESS'
  },
  TRANSACTION_STATUS: {
    pending: 'Pending',
    success: 'Success'
  },
  TRANSACTION_PRODUCT_TYPE: {
    tmhPostpaid: 'TrueMove H Post paid',
    tmhPrepaid: 'TrueMove H Pre paid',
    tol: 'True Online',
    tvs: 'True Vision',
    conv: 'True Smart Choice'
  }
};

module.exports = {
  ...paymentConfig
};
