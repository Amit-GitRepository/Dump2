/* PrepaidWrapper: Container for prepaid number section */
import map from 'lodash/map';
import noop from 'lodash/noop';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './PrepaidWrapper.style';
import {Button, ISText, RadioGroup, WrapperCard} from '../../../../Shared';
import {phoneNumberFormatter} from '../../../../../utils/common.util';
import {PRODUCT_TABS} from '../../../../../config/billUsage.config';
import {TMPrepaidProductCard} from '../../ProductCards';
import {translate} from '../../../../../language/i18n/helper';
import {View} from 'react-native';

class PrepaidWrapper extends Component {
  state = {
    selectedPhoneNumber: '',
    amount: 0
  }

  onRadioSelect = (phoneNumber) => () => {
    this.setState({
      selectedPhoneNumber: phoneNumber
    });
  }

  onRadioGroupSelect = (value) => {
    let amount;
    if (value !== 'more') {
      amount = parseInt(value);
    } else {
      amount = value;
    }
    this.setState({
      amount: amount
    });
  }

  payPrepaid = () => {
    const {setPaymentItems, goToScreen} = this.props;
    const {selectedPhoneNumber, amount} = this.state;
    setPaymentItems([{
      service: 'tmhPrepaid',
      amount: amount,
      msisdn: selectedPhoneNumber
    }]);
    if (amount === 'more') {
      goToScreen('BillUsageTopUpMore');
    } else {
      goToScreen('Payment');
    }

  }

  render () {
    const {productList, productDetail, availablePackage, toggleProductCollapse, goToScreen, containerStyle, fromPreLoginScreen, validateOTPStatus, defaultSelectedTab} = this.props;
    const {selectedPhoneNumber} = this.state;
    const showTopUpValue = selectedPhoneNumber !== '';
    const {tmhPrepaid} = productList;

    const prepaidSubscription = map(tmhPrepaid, (prepaidInfo, index) => {
      const {subscriberId, balance, productId, productType, isCollapsed, subscriptionType, statusCode, expiryDate} = prepaidInfo;
      const phoneNumber = phoneNumberFormatter(productId);
      const prepaidProductDetail =  result(productDetail, `tmhPrepaid.${subscriberId}`, {});
      const onPrepaidToggleCollapse = () => {
        (fromPreLoginScreen && !validateOTPStatus) ? this.props.viewCurrentUsage({navigateToExtraPackage: false}) :
          toggleProductCollapse('tmhPrepaid', subscriberId, null, productId, productType, subscriptionType, null, defaultSelectedTab);
      };
      const onTrueMoveHNavigatetoExtraPackage = () => goToScreen('TMPackageDetailsExtra', {title: phoneNumber, isPrepaid: true, productType: 'tmhPrepaid', subscriberId});

      return <TMPrepaidProductCard key={index} goToScreen={goToScreen} isSelected={productId === selectedPhoneNumber} onRadioSelect={this.onRadioSelect(productId)} index={index}
        phone={phoneNumber} amount={Number(balance)} expiryDate={expiryDate} statusCode={statusCode} onCollapseToggle={onPrepaidToggleCollapse}
        isCollapsed={isCollapsed} productDetail={prepaidProductDetail} onTrueMoveHNavigatetoExtraPackage={onTrueMoveHNavigatetoExtraPackage} validateOTPStatus={validateOTPStatus}/>;
    });

    return (
      <WrapperCard header={translate('BILLS_USAGE_PREPAID_NUMBERS')} style={{...styles.container, ...containerStyle}} contentContainerStyles={styles.contentContainer}>
        <ISText style={styles.prepaidTitleText} type='BOLD'>{translate('BILLS_USAGE_PREPAID_CHOOSE')}</ISText>
        <View style={styles.radioGroupSection}>
          <RadioGroup radioGroupData={availablePackage} style={styles.radioGroupStyles} showDefaultValue={showTopUpValue} onChange={this.onRadioGroupSelect}/>
          <Button text={translate('BILLS_USAGE_TOP_UP')} style={styles.buttonStyle} disabled={!showTopUpValue} onPress={this.payPrepaid}/>
        </View>
        {prepaidSubscription}
      </WrapperCard>
    );
  }
}
PrepaidWrapper.defaultProps = {
  productList: {},
  availablePackage: [],
  goToScreen: noop,
  productDetail: {},
  toggleProductCollapse: noop,
  containerStyle: {},
  setPaymentItems: noop,
  validateOTPStatus: false,
  fromPreLoginScreen: false,
  defaultSelectedTab: PRODUCT_TABS.CURRENT_USAGE
};
PrepaidWrapper.propTypes = {
  containerStyle: Proptypes.object,
  productList: Proptypes.object,
  availablePackage: Proptypes.array,
  goToScreen: Proptypes.func,
  productDetail: Proptypes.object,
  toggleProductCollapse: Proptypes.func,
  setPaymentItems: Proptypes.func,
  viewCurrentUsage: Proptypes.func,
  validateOTPStatus: Proptypes.bool,
  fromPreLoginScreen: Proptypes.bool,
  defaultSelectedTab: Proptypes.number
};
export default PrepaidWrapper;
