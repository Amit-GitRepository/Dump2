import moment from '../../../../../utils/moment.util';
import noop from 'lodash/noop';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import {add, subtract} from '../../../../../utils/floatingPoint.util';

class BaseProductCard extends Component {

  onBillToggle = (bill) => (check) => {
    let {totalAmount} = this.state;
    const {dueBills, toggleBillDetailCheck, onChecked, isChecked} = this.props;
    const invoices = [];
    if (check) {
      totalAmount = add(totalAmount, bill.unpaidAmount);
      invoices.push(bill.invoiceNo);
    }
    dueBills.forEach((currentBill) => {
      const condition = moment(currentBill.dueDate).isBefore(bill.dueDate) === !currentBill.isChecked && !currentBill.isChecked === check;
      if (condition) {
        totalAmount = check ? add(totalAmount, currentBill.unpaidAmount) : subtract(totalAmount, currentBill.unpaidAmount);
        currentBill.isChecked = !currentBill.isChecked;
        invoices.push(currentBill.invoiceNo);
      }
    });
    this.setState({totalAmount});
    toggleBillDetailCheck(invoices, check, totalAmount);
    if (dueBills.some((bill) => bill.isChecked)) {
      if (!isChecked) {
        onChecked();
      }
    } else if (isChecked) {
      onChecked();
    }
  }
}

BaseProductCard.defaultProps = {
  toggleBillDetailCheck: noop,
  onChecked: noop
};

BaseProductCard.propTypes = {
  dueBills: Proptypes.object,
  toggleBillDetailCheck: Proptypes.func,
  onChecked: Proptypes.func,
  isChecked: Proptypes.bool
};

export default BaseProductCard;
