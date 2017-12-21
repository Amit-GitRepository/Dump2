import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './HotExtraPackageCard.style';
import {Button, Icon, ISText} from '../../../../Shared';
import {colors} from '../../../../../themes/constants.styles';
import {View} from 'react-native';

class HotExtraPackageCard extends Component {

  render () {
    const {header, planValue, planDescription, noOfDays, dayDescription, cost, costDescription, buttonText, caretPosition} = this.props;
    const caretStyle = {};
    switch (caretPosition) {
    case 'LEFT': { caretStyle.left = '20%'; break; }
    case 'RIGHT': { caretStyle.right = '20%'; break; }
    case 'CENTER': { caretStyle.left = '50%'; break; }
    }
    return (
      <View>
        {caretPosition ? <Icon size={25} color={colors.PRIMARY_SUBTEXT} style={[styles.iconStyle, caretStyle]} name='caret-down' /> : null}
        <View style={styles.container}>
          <View style={styles.titleWrapper}><ISText type='BOLD' style={styles.title}>{header}</ISText></View>
          <View style={styles.content}>
            <View style={styles.payWrapper}>
              <Button text={buttonText} textType='BOLD' textStyle={styles.buttonText} style={styles.button}/>
            </View>
            <View style={styles.contentWrapper}>
              <View style={styles.data}>
                <ISText type='BOLD' style={styles.leftText} >{planValue}</ISText>
                <ISText style={styles.textGrey} ellipsizeMode={'tail'} numberOfLines={1}>{planDescription}</ISText>
              </View>
              <View style={styles.data}>
                <ISText type='BOLD' style={styles.centerText}>{noOfDays}</ISText>
                <ISText style={styles.textGrey} ellipsizeMode={'tail'} numberOfLines={1}>{dayDescription}</ISText>
              </View>
              <View style={styles.data}>
                <ISText type='BOLD' style={styles.rightText}>{cost}</ISText>
                <ISText style={styles.textGrey} ellipsizeMode={'tail'} numberOfLines={1}>{costDescription}</ISText>
              </View>
            </View>
          </View>
        </View>
      </View>);
  }
}

HotExtraPackageCard.defaultProps = {
  header: '',
  planValue: '',
  planDescription: '',
  noOfDays: '',
  dayDescription: '',
  cost: '',
  costDescription: '',
  buttonText: '',
  caretPosition: null
};

HotExtraPackageCard.propTypes = {
  header: Proptypes.string,
  planValue: Proptypes.string,
  planDescription: Proptypes.string,
  noOfDays: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  dayDescription: Proptypes.string,
  cost: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  costDescription: Proptypes.string,
  buttonText: Proptypes.string,
  caretPosition: Proptypes.oneOf(['LEFT', 'RIGHT', 'CENTER', null])
};

export default HotExtraPackageCard;
