import DetailCardRow from '../BillUsage/BillUsageShared/DetailCardRow.component';
import HeaderWithCaret from '../BillUsage/BillUsageShared/HeaderWithCaret.component';
import PackageDetailHeader from '../BillUsage/BillUsageShared/PackageDetailHeader/PackageDetailHeader.component';
import PackageOverview from '../BillUsage/BillUsageShared/PackageOverview/PackageOverview.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './TMPackageDetails.style';
import {ICON_MAP, QUOTA_TYPE} from '../../../config/billUsage.config';
import {ScrollView, View} from 'react-native';
import {translate} from '../../../language/i18n/helper';
import {WrapperCard} from '../../Shared';

class TMPackageDetails extends Component {
  render () {
    const {pricePlanInfo, mainPackage, billCycle, creditLimit, offerDesc, isPrepaid, isConvergence, phoneNumber} = this.props;
    const allPackages = mainPackage.map((packageDetail, index) => {
      const subType = (packageDetail.subQuotaType === QUOTA_TYPE.SOCIAL) ? packageDetail.subQuotaType : packageDetail.quotaType;
      const type = packageDetail.quotaType;

      let subText = '';
      let initialQuota = packageDetail.initialQuota;
      let initialQuotaUnit = packageDetail.initialQuotaUnit;
      if (packageDetail.fup) { // When FUP present: display FUP values
        subText = translate('BILLS_USAGE_MAXSPEED');
        initialQuota = packageDetail.fup.initialQuota;
        initialQuotaUnit = packageDetail.fup.initialQuotaUnit;
      }
      return (
        type ? <DetailCardRow value={initialQuota} unit={initialQuotaUnit} key={index}
          icon= {result(ICON_MAP[subType], 'titleIconPath', '')} title= {result(ICON_MAP[subType], 'titleText', '')} type={type} showSeparator={!((mainPackage.length - 1 === index) && !creditLimit)} subText={subText}/>
          : null
      );
    });
    const tmPackageDetail =   <View style={styles.container}>
      <PackageOverview title = {pricePlanInfo.description} subTitle = {offerDesc} showSeparator={!!(mainPackage.length || creditLimit)}/>
      {!isPrepaid && allPackages}
      {(!isPrepaid && creditLimit) ? <DetailCardRow value={creditLimit} unit={translate('BILLS_USAGE_THB')} title= 'BILLS_USAGE_CREDIT_LIMIT' showSeparator={false}/> : null}
    </View>;

    return (
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContentContainer}>
        <WrapperCard style={styles.wrapperContainer}>
          <HeaderWithCaret>
            <PackageDetailHeader isConvergence={isConvergence} name={translate('BILLS_USAGE_TRUEMOVE')} phoneNumber={phoneNumber}
              endDate={result(billCycle, 'closeDay', 0)} isPrepaid={isPrepaid}/>
          </HeaderWithCaret>
          {tmPackageDetail}
        </WrapperCard>
      </ScrollView>
    );
  }
}

TMPackageDetails.defaultProps = {
  pricePlanInfo: {},
  mainPackage: [],
  billCycle: {},
  creditLimit: '',
  offerDesc: '',
  isPrepaid: false,
  isConvergence: false,
  phoneNumber: ''
};

TMPackageDetails.propTypes = {
  pricePlanInfo: PropTypes.object,
  mainPackage: PropTypes.array,
  billCycle: PropTypes.object,
  creditLimit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offerDesc: PropTypes.string,
  isPrepaid: PropTypes.bool,
  isConvergence: PropTypes.bool,
  phoneNumber: PropTypes.string
};

export default TMPackageDetails;
