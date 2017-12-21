/* BillingMethods: show all the available paper bill & ebill items*/

import EBillItem from '../EBillItem/EBillItem.component';
import map from 'lodash/map';
import noop from 'lodash/noop';
import PaperBillItem from '../PaperBillItem/PaperBillItem.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './BillingMethods.style';
import {accountTypeMap} from '../../../config/ebill.config';
import {Button, Card} from '../../Shared';
import {ScrollView, View} from 'react-native';
import {translate} from '../../../language/i18n/helper';

class BillingMethods extends Component {
  onEditEBill = (data) => () => {
    this.props.onEditEbillAction({account: data});
  }

  onApplyEbill = () => {
    this.props.onApplyEbillAction();
  }

  generatePaperBillSection = (paperBillContent) => {
    const paperBillItem = map(paperBillContent, (data, index) => (<PaperBillItem
      key={`Paper-Bill-Item-${index}`}
      accountType={accountTypeMap[data.accountType]}
      productId={data.productId}
      billingAddress={result(data, 'billingValue.addressLine1', '') +  result(data, 'billingValue.addressLine2', '') + result(data, 'billingValue.addressLine3', '') + result(data, 'billingValue.addressLine4', '')}
      noBorder={index === paperBillContent.length - 1} />));
    return (
      <Card header={translate('BILLING_METHODS__PAPER_HEADER')}>
        {paperBillItem}
      </Card>
    );
  };

  generateEBillSection = (ebillContent) => {
    const eBillItem = map(ebillContent, (data, index) => (<EBillItem
      key={`E-Bill-Item-${index}`}
      accountType={accountTypeMap[data.accountType]}
      productId={data.productId}
      billingFormat={data.billingFormat}
      ebillValue={data.billingValue}
      onEditBill={this.onEditEBill(data)}
      noBorder={index === ebillContent.length - 1} />));
    return (
      <Card containerStyles={styles.ebillCard} header={translate('BILLING_METHODS__EBILL_HEADER')}>
        {eBillItem}
      </Card>
    );
  }

  generateApplyEbillButton = () => {
    const {paperBillContent} = this.props;
    if (paperBillContent.length > 0) {
      return (<View style={styles.buttonContainer}>
        <Button text={translate('BILLING_METHODS__ADD_APPLY')} onPress={this.onApplyEbill}/>
      </View>);
    }
  }

  render () {
    const {ebillContent, paperBillContent} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.cardContainer} contentContainerStyle={styles.scrollContainer}>
          {ebillContent.length > 0 && this.generateEBillSection(ebillContent)}
          {paperBillContent.length > 0 && this.generatePaperBillSection(paperBillContent)}
        </ScrollView>
        {this.generateApplyEbillButton()}
      </View>
    );
  }
}
BillingMethods.defaultProps = {
  onApplyEbillAction: noop,
  onEditBillAction: noop
};
BillingMethods.propTypes = {
  onApplyEbillAction: PropTypes.func,
  onEditEbillAction: PropTypes.func,
  ebillContent: PropTypes.array,
  paperBillContent: PropTypes.array
};
export default BillingMethods;
