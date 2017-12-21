import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './ProductCardTitle.style';
import {Icon, ISText, Touchable} from '../../../../Shared';
import {View} from 'react-native';

class ProductCardTitle extends Component {

  render () {
    const {text, subtext, isPrepaid, navigate} = this.props;
    const subTextStyles = (isPrepaid) ? styles.prepaidSubText : styles.subtext;
    return (
      <View style={styles.container}>
        <View style={styles.textArea}>
          <View style={styles.container}>
            <ISText type='BOLD' style={styles.text} numberOfLines={1} ellipsizeMode='tail'>{text}</ISText>
            { navigate && <Touchable borderless={true} onPress={navigate}><Icon style={styles.icon} name='bills_usage_search' size={25}/></Touchable>}
          </View>
          {subtext ? <ISText type='SEMIBOLD' style={subTextStyles}>{subtext}</ISText> : null}
        </View>

      </View>
    );
  }
}
ProductCardTitle.defaultProps = {
  text: '',
  subtext: '',
  isPrepaid: false
};
ProductCardTitle.propTypes = {
  text: Proptypes.string,
  subtext: Proptypes.string,
  navigate: Proptypes.func,
  isPrepaid: Proptypes.bool
};
export default ProductCardTitle;
