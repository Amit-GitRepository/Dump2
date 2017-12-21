import noop from 'lodash/noop';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import {availablePackagesConfig} from '../../../config/topUp.config';
import {Button, Card, ISText, RadioGroup} from '../../Shared/index';
import {phoneNumberFormatter} from '../../../utils/common.util';
import {styles} from './PayOthersTopUp.style';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class PayOthersTopUp extends Component {
  
  setTopUpValue = (value) => {
    if (value !== 'more') {
      this.setState({value: parseInt(value)});
    } else {
      this.setState({value});
    }
  }

  topUp = () => {
    const {goToScreen, setPaymentItems, product: {productId}} = this.props;
    const {value} = this.state;
    setPaymentItems([{amount: value, service: 'tmhPrepaid', msisdn: productId}]);
    if (value === 'more') {
      goToScreen('TopUpMore');
    } else {
      goToScreen('Payment');
    }
  }

  render () {
    const {serviceNo} = this.props;
    return (
      <View style={styles.container}>
        <Card header={`${translate('TOP_UP__BUTTON')}:${phoneNumberFormatter(serviceNo)}`} containerStyles={styles.card}>
          <View style={styles.horizontalLine}>
            <ISText type='SEMIBOLD' style={styles.textTitle}>{translate('TOP_UP__SELECT_AMOUNT')}</ISText>
            <RadioGroup radioButtonStyle={styles.radioButtonStyle} radioGroupData={availablePackagesConfig} onChange={this.setTopUpValue}/>
          </View>
          <View style={styles.bottomView}>
            <Button style={styles.topUpButton} text={translate('TOP_UP__BUTTON')} onPress={this.topUp}/>
          </View>
        </Card>
      </View>);
  }
}
PayOthersTopUp.defaultProps = {
  goToScreen: noop,
  setPaymentItems: noop,
  product: {}
};
PayOthersTopUp.propTypes = {
  serviceNo: Proptypes.string,
  goToScreen: Proptypes.func,
  setPaymentItems: Proptypes.func,
  product: Proptypes.object
};
export default PayOthersTopUp;