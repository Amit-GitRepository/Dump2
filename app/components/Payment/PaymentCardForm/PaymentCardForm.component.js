/* PaymentCardForm: */
/* eslint-disable camelcase */
import CardTypes from '../CardTypes/CardTypes.component';
import CreditCardConfig from '../../../config/creditCard.config';
import OmiseIcon from '../../../assets/omise-logo.png';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './PaymentCardForm.style';
import {Checkbox, IconTextInput, ISText} from '../../Shared';
import {Image, View} from 'react-native';
import {noop} from 'lodash';
import {translate} from '../../../language/i18n/helper';

class PaymentCardForm extends Component {
  render () {
    const {maxLength} = CreditCardConfig;
    const {canSaveCards, cardLimit, formData, onDataChanged} = this.props;
    return (
      <View>
        <View style={styles.rowContainer}>
          <ISText type='SEMIBOLD' style={styles.text}>{translate('PAYMENT__CARD_NUMBER')}</ISText>
          <CardTypes />
        </View>
        <IconTextInput keyboardType={'numeric'} type='SECONDARY' defaultValue={formData.number} placeholder={'Card Number'}
          onChangeText={onDataChanged('number')} maxLength={maxLength.cardNo}/>
        <ISText type='SEMIBOLD' style={styles.text}>{translate('PAYMENT__CARD_NAME')}</ISText>
        <IconTextInput type='SECONDARY' defaultValue={formData.name} placeholder={'Cardholder Name'}
          onChangeText={onDataChanged('name')} maxLength={maxLength.name}/>
        <View style={styles.rowContainer}>
          <View style={styles.expiryContainer}>
            <ISText type='SEMIBOLD' style={styles.text}>{translate('PAYMENT__CARD_EXPIRY')}</ISText>
            {/* TODO Expiry date validation */}
            <IconTextInput type='SECONDARY' defaultValue={formData.expirationDate}
              placeholder={'Date (MM/YYYY)'} onChangeText={onDataChanged('expirationDate')} maxLength={maxLength.date}/>
          </View>
          <View style={styles.fullFlex}>
            <ISText type='SEMIBOLD' style={styles.text}>{translate('PAYMENT__CARD_SECURITY')}</ISText>
            <IconTextInput keyboardType={'numeric'} containerStyle={styles.fullFlex} type='SECONDARY' defaultValue={formData.securityCode}
              placeholder={'Security Code'} onChangeText={onDataChanged('securityCode')} secureTextEntry={true}  maxLength={maxLength.cvv} />
          </View>
        </View>
        {canSaveCards && <View style={styles.saveCardContainer}>
          <Checkbox style={styles.checkbox} onChange={onDataChanged('saveCard')} isChecked={formData.saveCard}/>
          <ISText type='SEMIBOLD' style={styles.text}>{translate('PAYMENT__SAVE_CARD')}</ISText>
          <ISText type='REGULAR' style={styles.subtext}>{translate('PAYMENT__MAX_CARDS_LIMIT', {limit: cardLimit})}</ISText>
        </View>}
        <View style={styles.omiseBottomContainer}>
          <ISText type='REGULAR' style={styles.omiseMessageText}>Secured By</ISText>
          <Image source={OmiseIcon} resizeMode='contain' style={styles.omiseIcon}/>
        </View>
      </View>
    );
  }
}
PaymentCardForm.defaultProps = {
  cardLimit: 0,
  formData: {},
  onDataChanged: noop,
  canSaveCards: true
};
PaymentCardForm.propTypes = {
  cardLimit: PropTypes.number,
  formData: PropTypes.object,
  onDataChanged: PropTypes.func,
  canSaveCards: PropTypes.bool
};
export default PaymentCardForm;
