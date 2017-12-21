import ExtraPackageRow from './ExtraPackageRow.component';
import HeaderWithCaret from '../BillUsage/BillUsageShared/HeaderWithCaret.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './TMExtraPackage.style';
import {colors} from '../../../themes/constants.styles';
import {ISText, WrapperCard} from '../../Shared';
import {partition} from 'lodash';
import {ScrollView, View} from 'react-native';
import {translate} from '../../../language/i18n/helper';

class TMExtraPackage extends Component {

  render () {
    const {extraPackage, mainPackage, isPrepaid} = this.props;

    const title = extraPackage.length > 0  ? `(${extraPackage.length} ${translate('BILLS_USAGE_EXTRA_PACKAGES')})` : null;
    const filteredExtraPackages = partition(extraPackage, (item) => !item.isActive);
    const filteredMainPackage = partition(mainPackage, (item) => !item.isActive);

    const activeMainPackageContent = filteredMainPackage[0].map((packageRowItem, index) =>
      <ExtraPackageRow key={index} packageRowItem={packageRowItem} index={index} packageType={translate('BILLS_USAGE_MAIN')} length = {filteredMainPackage[0].length} hideSeparator={filteredExtraPackages[0].length} isPrepaid={isPrepaid}/>
    );
    const activeExtraPackageContent = filteredExtraPackages[0].map((packageRowItem, index) =>
      <ExtraPackageRow key={index} packageRowItem={packageRowItem} index={index} packageType={translate('BILLS_USAGE_EXTRA')} length = {filteredExtraPackages[0].length} isPrepaid={isPrepaid}/>
    );
    const inactiveMainPackageContent = filteredMainPackage[1].map((packageRowItem, index) =>
      <ExtraPackageRow key={index} packageRowItem={packageRowItem} index={index} packageType={translate('BILLS_USAGE_MAIN')} length = {filteredMainPackage[1].length} hideSeparator={filteredExtraPackages[1].length} isPrepaid={isPrepaid}/>
    );
    const inactiveExtraPackageContent = filteredExtraPackages[1].map((packageRowItem, index) =>
      <ExtraPackageRow key={index} packageRowItem={packageRowItem} index={index} packageType={translate('BILLS_USAGE_EXTRA')} length = {filteredExtraPackages[1].length} isPrepaid={isPrepaid}/>
    );

    const hasActivePackages = !!(filteredMainPackage[0].length || filteredExtraPackages[0].length);
    const hasInactivePackages = !!(filteredMainPackage[1].length || filteredExtraPackages[1].length);

    return (
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContentContainer}>
        {isPrepaid && title && <View style={styles.titleContainer}>
          <ISText type='BOLD' style={styles.titleText}>{title}</ISText>
        </View>}
        {hasActivePackages && <WrapperCard style={styles.activeContainer}>
          <HeaderWithCaret headerColor={colors.PRIMARY_SUBMENU} caretShadow={true} iconSize={32}>
            <ISText type='BOLD' style={styles.cardHeaderText}>{translate('EXTRA_PACKAGE_ACTIVE')}</ISText>
          </HeaderWithCaret>
          <View style={styles.cardContent}>
            {activeMainPackageContent}
            {activeExtraPackageContent}
          </View>
        </WrapperCard>}
        {hasInactivePackages && <WrapperCard style={styles.inactiveContainer}>
          <HeaderWithCaret headerColor={colors.PRIMARY_DISABLED_BG_TEXT} caretShadow={true} iconSize={32}>
            <ISText type='BOLD' style={styles.cardHeaderText}>{translate('EXTRA_PACKAGE_INACTIVE')}</ISText>
          </HeaderWithCaret>
          <View style={styles.cardContent}>
            {inactiveMainPackageContent}
            {inactiveExtraPackageContent}
          </View>
        </WrapperCard>}
      </ScrollView>
    );
  }
}

TMExtraPackage.defaultProps = {
  extraPackage: [],
  mainPackage: [],
  isPrepaid: false
};

TMExtraPackage.propTypes = {
  extraPackage: PropTypes.array,
  mainPackage: PropTypes.array,
  isPrepaid: PropTypes.bool
};

export default TMExtraPackage;
