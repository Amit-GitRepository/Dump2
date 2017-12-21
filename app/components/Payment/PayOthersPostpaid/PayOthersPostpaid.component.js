import Proptypes from 'prop-types';
import React, {Component} from 'react';
import typeMap from '../../../config/productTypeMap.config';
import WrapperCard from '../../Shared/WrapperCard/WrapperCard.component';
import {AmountText, Button, ISText} from '../../Shared';
import {noop, result} from 'lodash';
import {phoneNumberFormatter} from '../../../utils/common.util';
import {ScrollView, View} from 'react-native';
import {styles} from './PayOthersPostpaid.style';
import {TMPostpaidProductCard, TOnlineProductCard, TVisionProductCard} from '../../BillUsage/BillUsage/ProductCards';
import {translate} from '../../../language/i18n/helper';

class PayOthersPostpaid extends Component {
  getProductCard = () => {
    const {product, dueBills, toggleProductCheck, toggleProductCollapse, onBillDetailsClick, toggleBillDetailCheck} = this.props;
    const {productId, productType, accountId, isCollapsed, balance, statusCode, isChecked} = product;
    const phoneNumber = phoneNumberFormatter(productId);
    const dueBillsForProduct = result(dueBills, `${accountId}`);
    const oncheckToggle = () => toggleProductCheck();
    const onCollapseToggle = () => toggleProductCollapse(!isCollapsed, accountId);
    switch (productType) {
    case 'TrueMoveH' : {
      return (<TMPostpaidProductCard phone={phoneNumber} amount={balance} statusCode={statusCode} dueBills={dueBillsForProduct} isCollapsed={isCollapsed}
        onCollapseToggle={onCollapseToggle} onChecked={oncheckToggle} isChecked={isChecked} onBillDetailsClick={onBillDetailsClick} toggleBillDetailCheck={toggleBillDetailCheck(accountId)} isOthers={true}/>);
    }
    case 'TrueOnline': {
      return (<TOnlineProductCard phone={phoneNumber} amount={balance} statusCode={statusCode} dueBills={dueBillsForProduct} isCollapsed={isCollapsed}
        onCollapseToggle={onCollapseToggle} onChecked={oncheckToggle} isChecked={isChecked} onBillDetailsClick={onBillDetailsClick} toggleBillDetailCheck={toggleBillDetailCheck(accountId)} isOthers={true}/>);
    }
    case 'TrueVision': {
      return (<TVisionProductCard phone={phoneNumber} amount={balance} statusCode={statusCode} dueBills={dueBillsForProduct} isCollapsed={isCollapsed}
        onCollapseToggle={onCollapseToggle} onChecked={oncheckToggle} isChecked={isChecked} onBillDetailsClick={onBillDetailsClick} toggleBillDetailCheck={toggleBillDetailCheck(accountId)} isOthers={true}/>);
    }
    }
  }

  navigateToPayments = () => {
    const {product: {productType, accountId, isChecked, checkedBillSum}, goToScreen, setPaymentItems} = this.props;
    const accountNumber = accountId;
    if (isChecked) {
      const productToPay = [{
        service: typeMap[productType],
        amount: checkedBillSum,
        accountNumber
      }];
      setPaymentItems(productToPay);
      goToScreen('Payment');
    }
  }

  render () {
    const {product} = this.props;
    const totalAmount = product.isChecked ? product.checkedBillSum : 0;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <WrapperCard style={styles.wrapperCard} contentContainerStyles={styles.contentContainer}>
          <View style={styles.totalBillSection}>
            <View>
              <ISText style={styles.postpaidTitleText}>{translate('BILLS_USAGE_TOTAL')}</ISText>
              <AmountText style={styles.totalAmount} value={totalAmount} isTotalText/>
            </View>
            <Button text={translate('BILLS_USAGE_PAY')} disabled={!totalAmount} textStyle={styles.buttonText} style={styles.buttonStyle} onPress={this.navigateToPayments}/>
          </View>
          {this.getProductCard()}
        </WrapperCard>
      </ScrollView>
    );
  }
}
PayOthersPostpaid.defaultProps = {
  dueBills: {},
  product: {},
  toggleProductCheck: noop,
  goToScreen: noop,
  setPaymentItems: noop
};
PayOthersPostpaid.propTypes = {
  product: Proptypes.object.isRequired,
  dueBills: Proptypes.object,
  toggleProductCheck: Proptypes.func,
  toggleProductCollapse: Proptypes.func,
  toggleBillDetailCheck: Proptypes.func,
  onBillDetailsClick: Proptypes.func,
  setPaymentItems: Proptypes.func,
  goToScreen: Proptypes.func
};
export default PayOthersPostpaid;
