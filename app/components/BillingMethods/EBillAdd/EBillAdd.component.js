/* EbillAdd: show all the available paper bill items which user want to apply ebill for*/

import EBillAddItem from '../EBillAddItem/EBillAddItem.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './EBillAdd.style';
import {accountTypeMap, billFormats, ebillFormatOptions, emailRegex, msisdnRegex} from '../../../config/ebill.config';
import {APPLY_FOR_EBILL} from '../../../redux/actions/index.actions';
import {assign, filter, findIndex, map, noop, pick} from 'lodash';
import {Button, Card, ISText, RadioButton} from '../../Shared';
import {ScrollView, View} from 'react-native';
import {translate} from '../../../language/i18n/helper';

class EbillAdd extends Component {
  state = {
    selectedEbillOption: billFormats.SMS,
    accounts: []
  }

  componentWillMount () {
    const accounts = [];
    map(this.props.paperBillContent, (val) => {
      const obj = assign({}, val);
      obj.isSelected = true;
      obj.billingFormat = this.state.selectedEbillOption,
      obj.emailToRegister = '',
      obj.msisdnToRegister = val.accountType === 'tmhPostpaid' ? val.productId : '';
      accounts.push(obj);
    });
    this.setState({accounts});
  }

  onRadioSelect = () => (ebillOption) => {
    this.setState({selectedEbillOption: ebillOption});
  }

  generateEbillFormatItems = () => {
    const {selectedEbillOption} = this.state;
    return map(ebillFormatOptions, (option, index) =>
      <View style={styles.ebillFormatItem} key={option.id}>
        <RadioButton
          isSelected= {option.id === selectedEbillOption}
          onRadioSelect={this.onRadioSelect(option.id)}
          key={`${option.id}-${index}`}
          value={option.id}
          style={styles.radioButton} />
        <ISText type='SEMIBOLD' style={styles.ebillFormat}>{translate(`BILLING_METHODS__ADD_VIA_${option.id}`)}</ISText>
      </View>
    );
  }

  updateAccountValue = (accountId, value) => {
    const index = findIndex(this.state.accounts, {accountId});
    if (index !== -1) {
      const accounts = this.state.accounts;
      accounts[index].emailToRegister = this.state.selectedEbillOption === billFormats.EMAIL ? value : '';
      accounts[index].msisdnToRegister = this.state.selectedEbillOption === billFormats.SMS ? value : '';
      this.setState({accounts});
    }
  }

  toggleSelection = (accountId, isSelected) => {
    const index = findIndex(this.state.accounts, {accountId: `${accountId}`});
    if (index !== -1) {
      const accounts = this.state.accounts;
      accounts[index].isSelected = isSelected;
      this.setState({accounts});
    }
  }

  generateServiceListItems = () => map(this.state.accounts, (obj, index) => (<EBillAddItem
    key={`E-Bill-Add-Item-${index}`}
    accountId={obj.accountId}
    accountType={accountTypeMap[obj.accountType]}
    productId={obj.productId}
    defaultMSISDN={obj.accountType === 'tmhPostpaid' ? obj.productId : ''}
    billingFormat={this.state.selectedEbillOption}
    onValueUpdate={this.updateAccountValue}
    onToggleSelection={this.toggleSelection}
    isSelected={obj.isSelected}
  />))

  preparePayloadForEbillApply = () => {
    let shouldCallApplyForEBill = true;
    const accounts = [];
    const filteredAccount = filter(this.state.accounts, {isSelected: true});
    map(filteredAccount, (val) => {
      if (shouldCallApplyForEBill) {
        const obj = pick(val, ['accountId', 'accountType', 'billingFormat', 'emailToRegister', 'msisdnToRegister']);
        if (obj.billingFormat === 'EMAIL') {
          if (!emailRegex.test(obj.emailToRegister) || obj.emailToRegister === '') {
            shouldCallApplyForEBill = false;
            return;
          }
          obj.msisdnToRegister = '';
        } else {
          if (!msisdnRegex.test(obj.msisdnToRegister) || obj.msisdnToRegister === '') {
            shouldCallApplyForEBill = false;
            return;
          }
          obj.emailToRegister = '';
        }
        accounts.push(obj);
      }
    });
    if (shouldCallApplyForEBill) {
      const message = {
        title: translate('BILLING_METHODS__ADD_GO_PAPERLESS'),
        body: translate('BILLING_METHODS__ADD_BODY_PAPERLESS'),
        buttons: [
          {
            title: translate('BILLING_METHODS__ADD_CANCEL')
          },
          {
            title: translate('BILLING_METHODS__ADD_CONFIRM'),
            actionType: APPLY_FOR_EBILL,
            nextAction: accounts
          }
        ]
      };
      this.props.showPopup(message);
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.cardContainer}
          contentContainerStyle={styles.scrollContainer}
        >
          <Card header={translate('BILLING_METHODS__ADD_HEADER')}>
            <View style={styles.ebillFormatContainer}>
              {this.generateEbillFormatItems()}
            </View>
            <View style={styles.serviceListHeaderContainer}>
              <ISText type='SEMIBOLD' style={styles.serviceListHeader}>{translate('BILLING_METHODS__ADD_SERVICE_LIST')}</ISText>
            </View>
            <View style={styles.serviceListContainer}>
              {this.generateServiceListItems()}
            </View>
          </Card>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button text={translate('BILLING_METHODS__ADD_APPLY')} onPress={this.preparePayloadForEbillApply} />
        </View>
      </View>);
  }
}
EbillAdd.defaultProps = {
  paperBillContent: [],
  showPopup: noop
};
EbillAdd.propTypes = {
  paperBillContent: PropTypes.array,
  showPopup: PropTypes.func
};
export default EbillAdd;
