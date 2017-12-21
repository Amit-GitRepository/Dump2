/* CardSelection: shows list of cards and option to pay with new card*/

import jcb from '../../../assets/jcb.png';
import mastercard from '../../../assets/mastercard.png';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './CardSelection.style';
import visa from '../../../assets/visa.png';
import {Icon, ISText, RadioButton} from '../../Shared';
import {Image, View} from 'react-native';
/* eslint-disable camelcase */

const mapCardBrandImage = {
  'Visa': visa,
  'JCB': jcb,
  'Mastercard': mastercard,
  'MasterCard': mastercard
};

class CardSelection extends Component {

  deleteCard = (cardId) => () => {
    this.props.deleteCard(cardId);
  }

  render () {
    const {isSelected, cardDetails, onSelect, isLast, deleteCard} = this.props;
    const {brand, name, last_digits, id} = cardDetails;
    return (
      <View style={[styles.container, isLast && styles.hideBorder]}>
        <View style={styles.textContainer}>
          <RadioButton isSelected={isSelected} onRadioSelect={onSelect}/>
          {brand && <Image source={mapCardBrandImage[brand]} style={styles.cardType}/>}
          <ISText type='SEMIBOLD' style={styles.cardName} numberOfLines={1} ellipsizeMode='tail'>{name}</ISText>
          <ISText type='SEMIBOLD' style={styles.cardNumber}>{last_digits}</ISText>
        </View>

        {deleteCard && <Icon size={20} name='delete' style={styles.deleteButton} onPress={this.deleteCard(id)}/>}
      </View>
    );
  }
}
CardSelection.defaultProps = {
  isSelected: false,
  isLast: false,
  cardDetails: {},
  onSelect: noop
};
CardSelection.propTypes = {
  deleteCard: PropTypes.func,
  isLast: PropTypes.bool,
  onSelect: PropTypes.func,
  cardDetails: PropTypes.object,
  isSelected: PropTypes.bool
};
export default CardSelection;
