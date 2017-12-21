/* CardTypes: Shows card type images serially*/

import jcb from '../../../assets/jcb.png';
import mastercard from '../../../assets/mastercard.png';
import React, {Component} from 'react';
import styles from './CardTypes.style';
import visa from '../../../assets/visa.png';
import {Image, View} from 'react-native';

class CardTypes extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Image source={visa} style={styles.image} />
        <Image source={mastercard} style={styles.image} />
        <Image source={jcb} style={[styles.image, styles.jcb]} />
      </View>
    );
  }
}

export default CardTypes;
