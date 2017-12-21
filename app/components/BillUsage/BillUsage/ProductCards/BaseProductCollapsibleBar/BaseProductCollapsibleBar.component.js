import CircularAccordianButton from './CircularAccordianButton.component';
import Collapsible from 'react-native-collapsible';
import LinearGradient from 'react-native-linear-gradient';
import noop from 'lodash/noop';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './BaseProductCollapsibleBar.style';
import {AmountText, Checkbox, Icon, ISText, RadioButton} from '../../../../Shared';
import {colors} from '../../../../../themes/constants.styles';
import {PRODUCT_STATUS} from '../../../../../config/billUsage.config';
import {shadowActiveStyle, shadowInactiveStyle} from '../../../../../themes/application.styles';
import {translate} from '../../../../../language/i18n/helper';
import {View} from 'react-native';

class BaseProductCollapsibleBar extends Component {

  getTypeDetails= (type) => {
    const typeMap = {
      POSTPAID: {
        iconName: 'icon-true-move',
        sectionColor: colors.SECONDARY_TMOVE,
        sectionTextColor: colors.SECONDARY_TMOVE
      },
      PREPAID: {
        iconName: 'icon-true-move',
        sectionColor: colors.SECONDARY_TMOVE,
        sectionTextColor: colors.SECONDARY_TMOVE
      },
      ONLINE: {
        iconName: 'icon-true-online',
        sectionColor: colors.SECONDARY_TONLINE,
        sectionTextColor: colors.SECONDARY_TONLINE
      },
      VISION: {
        iconName: 'icon-true-visions',
        sectionColor: colors.SECONDARY_TVISION,
        sectionTextColor: colors.SECONDARY_TVISION
      },
      SMARTCHOICE: {
        iconName: 'icon-true-smart-choice',
        sectionColor: [colors.SECONDARY_TSMARTCHOICE_START, colors.SECONDARY_TSMARTCHOICE_MIDDLE, colors.SECONDARY_TSMARTCHOICE_END],
        sectionTextColor: colors.SECONDARY_TVISION
      }
    };
    return typeMap[type] || {};
  }

  getStatusTextAndColors = (statusCode, sectionColor, sectionTextColor, isNotPrepaid) => {
    let iconSectionColor = colors.PRIMARY_DISABLED_BG_TEXT;
    let textSectionColor = colors.PRIMARY_DISABLED_BG_TEXT;
    let statusText = '';

    switch (statusCode) {
    case PRODUCT_STATUS.ACTIVE: {
      iconSectionColor = sectionColor;
      textSectionColor = (isNotPrepaid) ? sectionTextColor :  colors.PRIMARY_DISABLED_BG_TEXT;
      break;
    } case PRODUCT_STATUS.SUSPEND: {
      iconSectionColor = (isNotPrepaid) ? colors.PRIMARY_DISABLED_BG_TEXT :  sectionTextColor;
      textSectionColor = (isNotPrepaid) ? colors.PRIMARY_DISABLED_BG_TEXT :  sectionTextColor;
      statusText = (isNotPrepaid) ? translate('BILLS_USAGE_SUSPENDED') : '';
      break;
    } case PRODUCT_STATUS.CANCEL: {
      statusText = translate('BILLS_USAGE_CANCELLED');
      break;
    }
    }
    return {
      iconSectionColor,
      statusText,
      textSectionColor
    };
  }

  render () {
    const {type, statusCode, leftTitleText, leftDetailText, rightTitleText, amountText, children, onCollapseToggle, isCollapsed, onChecked, isChecked, leftTitleTextStyle, checkboxDisabled} = this.props;
    const isNotPrepaid = !(type === 'PREPAID');
    const {iconName, sectionColor, sectionTextColor} = this.getTypeDetails(type);
    const {statusText, iconSectionColor, textSectionColor} = this.getStatusTextAndColors(statusCode, sectionColor, sectionTextColor, isNotPrepaid);
    const leftSectionStyles = (isNotPrepaid) ? {} : styles.flipColumn;
    const leftStyle = (statusText) ? styles.statusLeftSection : styles.leftSection;
    const rightStyle = (isNotPrepaid) ? [styles.rightSection, styles.notPrepaidRightSection] : styles.rightSection;
    const rightStatusStyle = (statusText) ? [rightStyle, styles.statusRightSection] : rightStyle;
    const leftDetailStyle = (isNotPrepaid) ? [styles.detailText, {color: textSectionColor}] : [styles.leftText, leftTitleTextStyle];
    const containerShadowStyle = isCollapsed ? shadowInactiveStyle : shadowActiveStyle;
    const productCardHeight = isNotPrepaid ? styles.postpaidProductCard : styles.prepaidProductCard;
    const selectButton = (isNotPrepaid) ? <Checkbox style={styles.checkbox} isChecked={isChecked} onChange={onChecked} disabled={checkboxDisabled} />
      : <RadioButton style={styles.checkbox} isSelected={isChecked} onRadioSelect={onChecked} />;
    return (
      <View style={[styles.container, containerShadowStyle]}>
        <View style={styles.subContainer}>
          <View style={styles.cardContainer}>
            <LinearGradient colors={Array.isArray(sectionColor) ? iconSectionColor :  [iconSectionColor, iconSectionColor]} start={{x: 0, y: 1}} end={{x: 1, y: 1}} style={styles.iconContainer}>
              <Icon name={iconName} style={styles.iconStyles}/>
            </LinearGradient>
            <View style={[styles.detailContainer, productCardHeight]}>
              <View style={styles.infoSection}>
                <View style={leftStyle}>
                  {statusText ? <ISText style={styles.statusText} type='BOLD'>{statusText}</ISText> : null}
                  <View style={leftSectionStyles}>
                    <ISText style={styles.leftTitleText} type='BOLD'>{leftTitleText}</ISText>
                    <ISText style={leftDetailStyle} type='BOLD'>{leftDetailText}</ISText>
                  </View>
                </View>
                <View style={rightStatusStyle}>
                  {(!isNotPrepaid) ? <ISText type='BOLD' style={styles.rightDetailText}>{rightTitleText}</ISText> : null}
                  <View style={styles.amountSection}>
                    <AmountText value={amountText}/>
                    {selectButton}
                  </View>
                </View>
              </View>
              <CircularAccordianButton onClick={onCollapseToggle} isCollapsed={isCollapsed} style={styles.accordianButton}/>
            </View>
          </View>
          <Collapsible collapsed={isCollapsed}>
            <View style={styles.childContainer}>
              {children}
            </View>
          </Collapsible>
        </View>
      </View>
    );
  }
}
BaseProductCollapsibleBar.defaultProps = {
  leftTitleText: '',
  leftDetailText: '',
  rightTitleText: '',
  amountText: 0,
  statusCode: 'ACTIVE',
  type: 'PREPAID',
  isCollapsed: true,
  onCollapseToggle: noop,
  onChecked: noop,
  isChecked: false,
  leftTitleTextStyle: {},
  checkboxDisabled: false
};
BaseProductCollapsibleBar.propTypes = {
  leftTitleText: Proptypes.string,
  leftDetailText: Proptypes.string,
  rightTitleText: Proptypes.string,
  amountText: Proptypes.number,
  children: Proptypes.node,
  statusCode: Proptypes.string,
  type: Proptypes.oneOf(['PREPAID', 'POSTPAID', 'ONLINE', 'VISION', 'SMARTCHOICE']),
  onCollapseToggle: Proptypes.func,
  isCollapsed: Proptypes.bool,
  onChecked: Proptypes.func,
  isChecked: Proptypes.bool,
  leftTitleTextStyle: Proptypes.object,
  checkboxDisabled: Proptypes.bool
};
export default BaseProductCollapsibleBar;
