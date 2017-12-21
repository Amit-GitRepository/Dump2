import moment from '../../../utils/moment.util';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './PaymentStatusDetails.style';
import {AmountText, Card, ISText} from '../../Shared';
import {ScrollView, View} from 'react-native';
import {TRANSACTION_PRODUCT_TYPE, TRANSACTION_STATUS} from '../../../config/payment.config';
import {translate} from '../../../language/i18n/helper';

class PaymentStatusDetails extends Component {
  render () {
    const {details: {transactionId, createdAt, status, amount, payables = []}} = this.props;
    const transactionStatus = TRANSACTION_STATUS[status];
    return (
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContentContainer}>
        <Card containerStyles={styles.detailsCard} header={translate('PAYMENT_STATUS__THANKS')}>
          <ISText style={styles.statusHeading}>{transactionStatus === TRANSACTION_STATUS.success ? translate('PAYMENT_STATUS__TRANSACTION_APPROVED') : translate('PAYMENT_STATUS__TRANSACTION_PENDING')}</ISText>
          <View style={styles.statusBar}>
            <ISText type='BOLD' style={styles.statusBarTitle}>{translate('PAYMENT_STATUS__TRANSACTION_DETAILS')}</ISText>
          </View>
          <View style={styles.infoRow}>
            <ISText type='SEMIBOLD' style={styles.infoRowTitleText}>{translate('PAYMENT_STATUS__TRANSACTION_NO')}</ISText>
            <ISText type='SEMIBOLD' style={styles.infoRowValueText}>{transactionId}</ISText>
          </View>
          <View style={styles.infoRow}>
            <ISText type='SEMIBOLD' style={styles.infoRowTitleText}>{translate('PAYMENT_STATUS__PAYMENT_DATE')}</ISText>
            <ISText type='SEMIBOLD' style={styles.infoRowValueText}>{new moment(createdAt).format('YYYY-MM-DD hh:mm:ss')}</ISText>
          </View>
          <View style={styles.infoRow}>
            <ISText type='SEMIBOLD' style={styles.infoRowTitleText}>{translate('PAYMENT_STATUS__SERVICE')}</ISText>
            <View>
              {payables.map(({service}, index) => (
                <ISText key={`payableService_${index}`} type='SEMIBOLD' style={styles.infoRowValueText}>{TRANSACTION_PRODUCT_TYPE[service]}</ISText>
              ))}
            </View>
          </View>
          <View style={styles.infoRow}>
            <ISText type='SEMIBOLD' style={styles.infoRowTitleText}>{translate('PAYMENT_STATUS__SERVICE_NO')}</ISText>
            <View>
              {payables.map(({accountNumber, msisdn}, index) => (
                <ISText key={`payableAccountNo_${index}`}type='SEMIBOLD' style={styles.infoRowValueText}>{accountNumber || msisdn}</ISText>
              ))}
            </View>
          </View>
          <View style={styles.infoRow}>
            <ISText type='SEMIBOLD' style={styles.infoRowTitleText}>{translate('PAYMENT_STATUS__TRANSACTION_STATUS')}</ISText>
            <ISText type='SEMIBOLD' style={styles.infoRowValueText}>{transactionStatus}</ISText>
          </View>
          <View style={styles.infoRow}>
            <ISText type='SEMIBOLD' style={styles.infoRowTitleText}>{translate('PAYMENT_STATUS__PAYMENT_AMOUNT')}</ISText>
            <AmountText value={amount} isTotalText={true} unitStyle={styles.amountUnitStyle} valueStyle={styles.amountValueStyle} precisionStyle={styles.amountPrecisionStyle}/>
          </View>
          <ISText style={styles.infoMessage}>{translate('PAYMENT_STATUS__INFO_MSG')}</ISText>
        </Card>
      </ScrollView>
    );
  }
}

PaymentStatusDetails.defaultProps = {
  details: {}
};

PaymentStatusDetails.propTypes = {
  details: PropTypes.object
};

export default PaymentStatusDetails;
