/* True Move H: Bill details: */

import DetailCardRow from '../BillUsage/BillUsageShared/DetailCardRow.component';
import HeaderWithCaret from '../BillUsage/BillUsageShared/HeaderWithCaret.component';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './TMBillDetails.style';
import {AmountText, Icon, ISText, WrapperCard} from '../../Shared';
import {colors} from '../../../themes/constants.styles';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class TMBillDetail extends Component {
  render () {
    const {billDetailInfo} = this.props;
    return (
      <WrapperCard>
        <HeaderWithCaret style={styles.headerContainer}>
          {/* WIP: Hard coding the data */}
          <View style={styles.invoiceSection}>
            <ISText style={styles.headerTitle} type='BOLD'>{translate('BILLS_USAGE_INVOICE_NUMBER')}</ISText>
            <ISText style={styles.headerSubtitle} type='BOLD'>{billDetailInfo.invoiceNumber}</ISText>
          </View>
          <View style={styles.iconSection}>
            <View style={styles.verticalLine}/>
            <Icon size={30} color={colors.PRIMARY_BG_TEXT_CONTRAST} name='icon_pdf' style={styles.iconStyle}/>
          </View>
        </HeaderWithCaret>
        <View style={styles.totalSection}>
          <ISText style={styles.totalText} type='BOLD'>{translate('BILLS_USAGE_TOTAL')}</ISText>
          <AmountText value={billDetailInfo.total}/>
        </View>
        <ISText style={styles.usageSection} type='BOLD'>{translate('BILLS_USAGE_USAGE_DETAIL')}</ISText>
        {billDetailInfo.voice && <DetailCardRow rowData={billDetailInfo.voice} type='voice'/>}
        {billDetailInfo.data && <DetailCardRow rowData={billDetailInfo.data} type='data'/>}
        {billDetailInfo.extraPackage && <DetailCardRow rowData={billDetailInfo.extraPackage} type='extraPackage'/>}
        {billDetailInfo.sms && <DetailCardRow rowData={billDetailInfo.sms} type='sms'/>}
        {billDetailInfo.other && <DetailCardRow rowData={billDetailInfo.other} type='other'/>}
        <View style={styles.footerSection}>
          <View style={styles.limitSection}>
            <ISText style={styles.footerText} type='BOLD'>{translate('BILLS_USAGE_CREDIT_LIMIT')}</ISText>
            <AmountText value={billDetailInfo.creditLimit} displayPrecision={false}/>
          </View>
          <View style={styles.verticalLineFooter}/>
          <View style={styles.limitSection}>
            <ISText style={styles.footerText} type='BOLD'>{translate('BILLS_USAGE_EXCEED_USAGE')}</ISText>
            <AmountText value={billDetailInfo.exceedUsage} precisionStyle={styles.precisionText}/>
          </View>
        </View>
      </WrapperCard>);
  }
}
TMBillDetail.defaultProps = {
  billDetailInfo: {}
};
TMBillDetail.propTypes = {
  billDetailInfo: Proptypes.object
};
export default TMBillDetail;
