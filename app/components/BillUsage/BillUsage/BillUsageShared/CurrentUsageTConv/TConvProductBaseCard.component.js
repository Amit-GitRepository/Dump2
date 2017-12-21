import Collapsible from 'react-native-collapsible';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './TConvProductBaseCard.style';
import {colors} from '../../../../../themes/constants.styles';
import {Icon, ISText, Touchable} from '../../../../Shared';
import {noop} from 'lodash';
import {phoneNumberFormatter} from '../../../../../utils/common.util';
import {translate} from '../../../../../language/i18n/helper';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';

const getTypeDetails = (type, productId) => {
  const typeMap = {
    TrueMoveH: {
      sectionColor: colors.SECONDARY_TMOVE,
      titleText: phoneNumberFormatter(productId),
      titleDescText: translate('BILLS_USAGE_TRUEMOVE')
    },
    TrueOnline: {
      sectionColor: colors.SECONDARY_TONLINE,
      titleText: productId,
      titleDescText: translate('BILLS_USAGE_TRUEONLINE')
    },
    TrueVision: {
      sectionColor: colors.SECONDARY_TVISION,
      titleText: productId,
      titleDescText: translate('BILLS_USAGE_TRUEVISIONS')
    }
  };
  return typeMap[type] || {};
};

const getStatusTextAndColors = (statusCode, sectionColor) => {
  let iconSectionColor = colors.PRIMARY_DISABLED_BG_TEXT;
  let statusText = '';

  switch (statusCode) {
  case 'ACTIVE': {
    iconSectionColor = sectionColor;
    break;
  } case 'SUSPEND': {
    iconSectionColor = colors.PRIMARY_DISABLED_BG_TEXT;
    statusText = translate('BILLS_USAGE_SUSPENDED');
    break;
  } case 'CANCEL': {
    statusText = translate('BILLS_USAGE_CANCELLED');
    break;
  }
  }
  return {
    iconSectionColor,
    statusText
  };
};

const AnimatableIcon = Animatable.createAnimatableComponent(Icon);

class TConvProductBaseCard extends Component {

  state ={
    isCollapsed: true
  }

  render () {
    const {children, product, onCollapseToggle, isLast} = this.props;
    const {productId, productType, statusCode, isCollapsed} = product;
    const {sectionColor, titleText, titleDescText} = getTypeDetails(productType, productId);
    const {statusText, iconSectionColor} = getStatusTextAndColors(statusCode, sectionColor);
    const leftDetailStyle = [styles.detailText, {color: iconSectionColor}];
    const arrowStyle = !isCollapsed ? [styles.collapsedArrowStyle, styles.arrowStyle] : styles.arrowStyle;
    return (
      <View key={productId} style={[styles.container, !isCollapsed && styles.activeShadow]}>
        <Touchable onPress={onCollapseToggle}>
          <View style={[styles.subContainer, isCollapsed && !isLast && styles.separator]}>
            {statusText ? <ISText style={styles.statusText} type='BOLD'>{statusText}</ISText> : null}
            <View style={{flexGrow: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <ISText style={styles.leftTitleText} type='BOLD'>{titleText}</ISText>
              <AnimatableIcon name={'chevron-down'} style={arrowStyle} transition='rotate' useNativeDriver/>
            </View>
            <ISText style={leftDetailStyle} type='BOLD'>{titleDescText}</ISText>
          </View>
        </Touchable>
        <Collapsible style={styles.childContainer} collapsed={isCollapsed}>
          {children}
        </Collapsible>
      </View>);
  }
}

TConvProductBaseCard.defaultProps = {
  product: {},
  onCollapseToggle: noop,
  isLast: false
};

TConvProductBaseCard.propTypes = {
  isLast: Proptypes.bool,
  product: Proptypes.object,
  children: Proptypes.node,
  onCollapseToggle: Proptypes.func
};
export default TConvProductBaseCard;
