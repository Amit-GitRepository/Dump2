import Button from '../../Shared/Button/Button.component';
import IconTextInput from '../../Shared/IconTextInput/IconTextInput.component';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import {ISText} from '../../Shared/index';
import {Keyboard, View} from 'react-native';
import {styles} from './PayOthersCard.style';
import {translate} from '../../../language/i18n/helper';
 
class PayOthersCard extends Component {

  state=  {
    buttonDisabled: true
  }

  setServiceNo = (newServiceNo) => this.serviceNo = newServiceNo;

  navigate = () => {
    Keyboard.dismiss();
    if (this.serviceNo)
      this.props.fetchPaymentProducts(this.serviceNo); 
  }

  onSubmitEditing = () => {
    this.navigate();
  }

  onTextInputChange = (text) => {
    const {buttonDisabled} = this.state;
    if (text && buttonDisabled) {
      this.setState({buttonDisabled: false});
    } else if (!text && !buttonDisabled) {
      this.setState({buttonDisabled: true});
    }
    this.serviceNo = text;
  }

  render () {
    const {buttonDisabled} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <ISText style={styles.headerText} type='SEMIBOLD'>{translate('PAYMENT_OTHERS_ENTER_PROMPT')}</ISText>
          <IconTextInput keyboardType={'numeric'} containerStyle={styles.inputBox} placeholder={translate('PAYMENT_OTHERS_PLACEHOLDER')} onChangeText={this.onTextInputChange} onSubmitEditing={this.onSubmitEditing} iconName={'question'} iconSize={20} numberOfLines={1}/>
          <Button style={styles.button} disabled={buttonDisabled} text={translate('PAYMENT_OTHERS__NEXT')} onPress={this.navigate}/>
        </View>
      </View>
    );
  }
}
PayOthersCard.propTypes = {
  fetchPaymentProducts: Proptypes.func
};
export default PayOthersCard;