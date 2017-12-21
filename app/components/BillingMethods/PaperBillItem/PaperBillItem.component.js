/* PaperBillItem: show details of paper bill item such as address, productType etc. */

import camelCase from 'lodash/camelCase';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './PaperBillItem.style';
import {ISText} from '../../Shared';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class PaperBillItem extends Component {

  generateBillingAddress = () => {
    const {billingAddress} = this.props;
    return (
      <View style={styles.addressContainer}>
        <View style={styles.addressHeaderContainer}>
          <ISText type='BOLD' style={styles.addressHeader}>
            {translate('BILLING_METHODS__ADDRESS')}
          </ISText>
          {/*
            * commenting the edit button as this functionality is out of beta scope
            <Button
              textType='SEMIBOLD'
              type='inline'
              text={translate('BILLING_METHODS__EDIT')}
          /> */}
        </View>
        <ISText style={styles.address}>
          {billingAddress}
        </ISText>
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
        {this.generateBillingAddress()}
      </View>
    );
  }
}

PaperBillItem.defaultProps = {
  billingAddress: '',
  productId: '',
  accountType: '',
  noBorder: false
};

PaperBillItem.propTypes = {
  accountType: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  billingAddress: PropTypes.string,
  noBorder: PropTypes.bool
};

export default PaperBillItem;
