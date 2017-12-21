/* EBillItem: show details of e-bill item such as ebill option, productType etc. */

import camelCase from 'lodash/camelCase';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './EBillItem.style';
import {Button, ISText} from '../../Shared';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class EBillItem extends Component {

  generateEBillOption = () => {
    const {billingFormat, ebillValue, onEditBill} = this.props;
    return (
      <View style={styles.ebillOptionContainer}>
        <ISText type='BOLD' style={styles.ebillOptionFormat}>
          {translate(`BILLING_METHODS__${billingFormat.toUpperCase()}`)}
        </ISText>
        <ISText style={styles.ebillOptionValue}>
          {ebillValue}
        </ISText>
        <Button
          textType='SEMIBOLD'
          type='inline'
          text={translate('BILLING_METHODS__EDIT')}
          onPress={onEditBill}
        />
      </View>
    );
  }

  render () {
    const {productId, accountType, noBorder} = this.props;
    return (
      <View style={[styles.container, noBorder ? null : styles.borderBottom]}>
        <View style={styles.serviceInfoContainer}>
          <ISText type='BOLD' style={styles.serviceNumber}>{productId}</ISText>
          <ISText type='BOLD' style={styles[camelCase(accountType)]}>{accountType}</ISText>
        </View>
        {this.generateEBillOption()}
      </View>
    );
  }
}

EBillItem.defaultProps = {
  productId: '',
  accountType: '',
  onEditBill: noop,
  noBorder: false
};

EBillItem.propTypes = {
  accountType: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  billingFormat: PropTypes.string,
  ebillValue: PropTypes.string,
  onEditBill: PropTypes.func,
  noBorder: PropTypes.bool
};

export default EBillItem;
