/* PaymentCard: includes card form and transaction amount*/

import CardSelection from '../CardSelection/CardSelection.component';
import Collapsible from 'react-native-collapsible';
import PaymentCardForm from '../PaymentCardForm/PaymentCardForm.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './PaymentCard.style';
import {AmountText, Button, Icon, ISText, KeyboardScrollView, Modal, WrapperCard} from '../../Shared';
import {CARD_TYPE, MAXIMUM_SAVE_CARD_COUNT} from '../../../config/payment.config';
import {findIndex, isEmpty, noop, sumBy} from 'lodash';
import {REMOVE_EXISTING_CARD} from '../../../redux/actions/index.actions';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

const generateCardDeleteMessage = (payload) => ({
  title: translate('PAYMENT__CARD_DELETE_MODAL_HEADER'),
  body: translate('PAYMENT__CARD_DELETE_MODAL_DESC'),
  buttons: [
    {
      title: translate('BUTTON__NO')
    },
    {
      title: translate('BUTTON__YES'),
      actionType: REMOVE_EXISTING_CARD,
      nextAction: payload
    }
  ]
});

class PaymentCard extends Component {

  state = {
    selectedCard: {
      index: null,
      type: null,
      id: null
    },
    formData: {},
    isOtherCollapsed: true,
    replaceCardModalVisiblity: false,
    replaceCardId: ''
  }

  componentWillReceiveProps = (nextProps) => {
    const {cards} = this.props.savedCards;
    const {cards: nextCards} = nextProps.savedCards;
    const {selectedCard} = this.state;
    const {index, type, id} = selectedCard;
    // Check if the cards got deleted
    if (cards.length !== nextCards.length && index) {
      // check if the existing selected card got deleted
      if (type === CARD_TYPE.SAVED && findIndex(cards, {id}) > -1) {
        this.setState({selectedCard: {index: null, type: null, id: null}});
      } else {
        this.setState({selectedCard: {...selectedCard, index: index - 1}});
      }
    }
  }

  deleteExistingCard = (id) => {
    const {showPopup} = this.props;
    const message = generateCardDeleteMessage(id);
    showPopup(message);
  }

  onCardSelect = (index, type, id) => (radioVal, radioButtonOldStatus) => {
    if (radioButtonOldStatus) { // if radioButtonOldStatus was already true, don't do anything
      return;
    }
    const isOtherCollapsed = (type === CARD_TYPE.OTHER) ? !this.state.isOtherCollapsed : true;
    this.setState({selectedCard: {index, type, id}, isOtherCollapsed, formData: {}});
  }

  onFormDateChanged = (type) => (value) => {
    const newFormData = {...this.state.formData, [type]: value};
    this.setState({formData: newFormData});
  }

  onSubmit = () => {
    const {selectedCard: {type, index}, formData} = this.state;
    const {userProfile, payForNewCustomer, payForExistingCustomer, preLoginPayment,
      paymentItems, savedCards: {customerId, cards = []}} = this.props;
    if (!isEmpty(userProfile)) {
      // check for existing customer
      if (customerId) {
        if (formData.saveCard && cards.length >= MAXIMUM_SAVE_CARD_COUNT) { // if saved card limit is exceeded, show modal
          this.setState({replaceCardModalVisiblity: true});
        } else {
          payForExistingCustomer({type, customerId, paymentItems, formData, selectedCard: cards[index]});
        }
      } else {
        payForNewCustomer({paymentItems, formData});
      }
    } else {
      preLoginPayment({paymentItems, formData});
    }
  }

  setReplaceCardId = (replaceCardId) => () => this.setState({replaceCardId})
  closeModal = () => this.setState({replaceCardModalVisiblity: false})
  replaceCardAndPay = () => {
    const {formData, replaceCardId} = this.state;
    const {paymentItems, savedCards: {customerId}, replaceCard} = this.props;
    const cardData = {
      id: replaceCardId,
      customerId,
      paymentItems,
      formData
    };
    replaceCard(cardData);
    this.setState({replaceCardModalVisiblity: false});
  }

  render () {
    const {userProfile, onFormSubmit, cardLimit, savedCards, paymentItems} = this.props;
    const {selectedCard, isOtherCollapsed, formData, replaceCardModalVisiblity, replaceCardId} = this.state;
    const noOfSavedCards = savedCards.cards.length;
    let amount = sumBy(paymentItems, (item) => item.amount);
    amount = amount.toFixed(2);
    return (
      <KeyboardScrollView contentContainerStyle={styles.contentContainer}>
        <WrapperCard contentContainerStyles={styles.container}>
          <View style={styles.topSection}>
            <ISText type='BOLD' style={styles.amountText}>{translate('PAYMENT__AMOUNT')}</ISText>
            <AmountText value={Number(amount)} isTotalText={true}/>
          </View>
          <View style={styles.textBar}>
            <ISText type='SEMIBOLD' style={styles.textBarTitle}>{translate('PAYMENT__CARD_DETAILS')}</ISText>
          </View>
          {
            noOfSavedCards > 0 ? savedCards.cards.map((card, index) =>
              [
                <CardSelection key={`SaveCards_${index}`} isSelected={selectedCard.index === index} deleteCard={this.deleteExistingCard} cardDetails={card} onSelect={this.onCardSelect(index, CARD_TYPE.SAVED, card.id)}/>,
                (noOfSavedCards - 1 === index) && <View key={`SaveCards_${index + 1}`}>
                  <CardSelection isSelected={selectedCard.index === index + 1} cardDetails={{name: 'Other'}} onSelect={this.onCardSelect(index + 1, CARD_TYPE.OTHER)} isLast={true}/>
                  <Collapsible collapsed={isOtherCollapsed}>
                    <PaymentCardForm onFormSubmit={onFormSubmit} amount={amount} cardLimit={cardLimit} formData={formData} onDataChanged={this.onFormDateChanged}/>
                  </Collapsible>
                </View>
              ])
              : <PaymentCardForm canSaveCards={!isEmpty(userProfile)} onFormSubmit={onFormSubmit} amount={amount} noOfSavedCards={noOfSavedCards} cardLimit={cardLimit} formData={formData} onDataChanged={this.onFormDateChanged}/>
          }
        </WrapperCard>
        <Button text={translate('PAYMENT__PAY_BUTTON', {amount})} disabled={selectedCard.index === null && isEmpty(formData)} style={styles.buttonStyle} onPress={this.onSubmit}/>
        <Modal animationIn={'zoomIn'} animationOut={'zoomOut'} style={styles.modal}
          animationInTiming={400} backdropTransitionInTiming={1000} backdropTransitionOutTiming={1000}
          animationOutTiming={400} isVisible={replaceCardModalVisiblity}>
          <View style={styles.modalContainer}>
            <Icon name='cross' style={styles.cross} onPress={this.closeModal} />
            <ISText type='SEMIBOLD' style={styles.headerText}>{translate('PAYMENT__SAVE_CARD_MODAL_HEADER', {limit: MAXIMUM_SAVE_CARD_COUNT})}</ISText>
            <View style={styles.textBar}>
              <ISText type='SEMIBOLD' style={styles.textBarTitle}>{translate('PAYMENT__SAVE_CARD_MODAL_DESC')}</ISText>
            </View>
            {savedCards.cards.map((card, index) => (
              <CardSelection cardDetails={card} key={index} isLast={index === noOfSavedCards - 1} isSelected={card.id === replaceCardId} onSelect={this.setReplaceCardId(card.id)}/>
            ))}
            <View style={styles.buttonContainer}>
              <Button textType='BOLD' textStyle={{...styles.btnText,  ...styles.secondarybtnText}} type='secondary' touchableStyle={styles.button} text={translate('BUTTON__CANCEL')} onPress={this.closeModal} />
              <View style={styles.btnSeparator} />
              <Button textType='BOLD' textStyle={styles.btnText} type='primary' touchableStyle={styles.button} text={translate('PAYMENT__REPLACE_CARD')} onPress={this.replaceCardAndPay} />
            </View>
          </View>
        </Modal>
      </KeyboardScrollView>);
  }
}
PaymentCard.defaultProps = {
  paymentItems: [],
  onFormSubmit: noop,
  cardLimit: 0,
  payForNewCustomer: noop,
  payForExistingCustomer: noop,
  replaceCard: noop,
  preLoginPayment: noop,
  showPopup: noop,
  savedCards: {},
  userProfile: {}
};
PaymentCard.propTypes = {
  onFormSubmit: PropTypes.func,
  paymentItems: PropTypes.array,
  cardLimit: PropTypes.number,
  payForNewCustomer: PropTypes.func,
  replaceCard: PropTypes.func,
  payForExistingCustomer: PropTypes.func,
  preLoginPayment: PropTypes.func,
  userProfile: PropTypes.object,
  showPopup: PropTypes.func,
  savedCards: PropTypes.object
};
export default PaymentCard;
