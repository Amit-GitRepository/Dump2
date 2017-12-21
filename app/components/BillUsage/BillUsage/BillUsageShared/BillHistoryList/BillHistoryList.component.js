import moment from '../../../../../utils/moment.util';
import noop from 'lodash/noop';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './BillHistoryList.style';
import {AmountText, Button, Checkbox, ISText} from '../../../../Shared';
import {translate} from '../../../../../language/i18n/helper';
import {View} from 'react-native';

class BillHistoryList extends Component {

  billDetailClick = (invoiceNo) => () => this.props.onBillDetailsClick(invoiceNo);

  render () {
    const {dueBills, style, onPaymentHistoryClick, onBillToggle, isCancelled} = this.props;
    const currentDate = moment();
    return (
      <View style={[styles.container, style]}>
        {isCancelled && <View style={styles.titleContainer}><ISText type='BOLD' style={styles.title}>{translate('BILLS_USAGE_BILL_DETAILS')}</ISText>
        </View>}
        {dueBills && dueBills.length > 0 ?
          dueBills.map((bill, index) => {
            const billDate = new moment(bill.invoiceCycle, 'DD/MM/YYYY');
            const billDueDate = new moment(bill.dueDate);
            const overDueDays = currentDate.diff(billDueDate, 'days');
            return (
              <View style={styles.cardContainer} key={`billingCard_${index}`}>
                <View style={styles.leftSection}>
                  <ISText type='BOLD' style={styles.billMonthText}>{billDate.format('MMMM')}</ISText>
                  <ISText type='BOLD' style={styles.dueDateText}>{(overDueDays > 0) ? `${translate('BILLS_USAGE_OVERDUE', {count: overDueDays, days: overDueDays})}` : `${translate('BILLS_USAGE_DUE_DATE')}: ${billDueDate.format('DD MMM YY')}`}</ISText>
                </View>
                <View style={styles.rightSection}>
                  <View style={styles.amountSection}>
                    <AmountText value={bill.unpaidAmount} isTotalText={false}/>
                    <Checkbox style={styles.checkbox} onChange={onBillToggle(bill)} isChecked = {bill.isChecked}/>
                  </View>
                  <Button type='inline' text={translate('BILLS_USAGE_DETAILS')} style={styles.billDetailButton} textStyle={styles.billDetailText} onPress = {this.billDetailClick({invoiceNo: bill.invoiceNo})}/>
                </View>
              </View>
            );
          }) : <ISText type='BOLD' style = {styles.noBillPlaceHolderText}>{translate('BILLS_USAGE_BILL_DETAILS_PLACEHOLDER')}</ISText>
        }
        <Button type='inline' text={translate('BILLS_USAGE_PAYMENT_HISTORY')} textStyle={styles.otherButton} onPress={onPaymentHistoryClick}/>
      </View>
    );
  }
}

BillHistoryList.defaultProps = {
  dueBills: [],
  onBillDetailsClick: noop,
  onPaymentHistoryClick: noop,
  onBillToggle: noop,
  isCancelled: false,
  style: {}
};

BillHistoryList.propTypes = {
  dueBills: Proptypes.array,
  onBillDetailsClick: Proptypes.func,
  onPaymentHistoryClick: Proptypes.func,
  style: Proptypes.object,
  onBillToggle: Proptypes.func,
  isCancelled: Proptypes.bool
};

export default BillHistoryList;
