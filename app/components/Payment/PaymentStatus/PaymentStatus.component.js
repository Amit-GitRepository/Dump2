import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './PaymentStatus.style';
import {AmountText, Button, Card, Icon, ISText} from '../../Shared';
import {PAYMENT_STATUS} from '../../../config/payment.config';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class PaymentStatus extends Component {
  render () {
    const {details, status, goToHome, goToDetails} = this.props;
    const successView = (
      <View style={styles.statusDetails}>
        <View style={styles.successLogo}>
          <Icon name='check' style={styles.icon}/>
        </View>
        <View style={styles.amount}>
          <AmountText value={(result(details, 'amount', 0))} isTotalText={true}/>
        </View>
        <Button text={translate('PAYMENT_STATUS__VIEW_DETAIL')} onPress={goToDetails} type='secondary' style={styles.viewDetailButton} textStyle={styles.viewDetailText}/>
      </View>
    );
    const failureView = (
      <View style={styles.statusDetails}>
        <View style={styles.failureLogo}>
          <Icon name='cross' style={styles.icon}/>
        </View>
        <ISText type='BOLD' style={styles.paymentFailInfo}>{translate('PAYMENT_STATUS__TRY_AGAIN')}</ISText>
        <Button text={translate('PAYMENT_STATUS__OK')} onPress={goToHome} style={styles.okButtonStyle}/>
      </View>
    );
    return (
      <View style={styles.mainContainer}>
        <View style={[styles.shadowContainer, styles.card]} elevation={5}>
          <Card containerStyles={styles.card} header={status === PAYMENT_STATUS.SUCCESS ? translate('PAYMENT_STATUS__PAYMENT_COMPLETED') : translate('PAYMENT_STATUS__PAYMENT_FAILED')} elevation={0}>
            {
              status === PAYMENT_STATUS.SUCCESS ? successView : failureView
            }
          </Card>
        </View>

      </View>
    );
  }
}

PaymentStatus.defaultProps = {
  status: '',
  details: {},
  goToHome: noop,
  goToDetails: noop
};

PaymentStatus.propTypes = {
  status: PropTypes.string,
  details: PropTypes.object,
  goToHome: PropTypes.func,
  goToDetails: PropTypes.func
};

export default PaymentStatus;
