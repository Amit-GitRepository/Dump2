import DetailCardRow from '../BillUsage/BillUsageShared/DetailCardRow.component';
import HeaderWithCaret from '../BillUsage/BillUsageShared/HeaderWithCaret.component';
import PackageDetailHeader from '../BillUsage/BillUsageShared/PackageDetailHeader/PackageDetailHeader.component';
import PackageOverview from '../BillUsage/BillUsageShared/PackageOverview/PackageOverview.component';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './TOLPackageDetails.style';
import {ICON_MAP} from '../../../config/billUsage.config';
import {translate} from '../../../language/i18n/helper';
import {WrapperCard} from '../../Shared';

class TOLPackageDetails extends Component {
  render () {
    const {packageDetails, packageInfo, isConvergence, productId} = this.props;
    const {uploadSpeed, downloadSpeed, unit, planOffer} = packageDetails;
    const {description} = packageInfo;
    return (
      <WrapperCard style={styles.container}>
        <HeaderWithCaret headerColor = {styles.headerColor} customIconStyle = {styles.iconStyle} style = {styles.headerStyle}>
          <PackageDetailHeader isConvergence = {isConvergence} phoneNumber = {productId} name = {translate('BILLS_USAGE_TRUEONLINE')}/>
        </HeaderWithCaret>
        <PackageOverview title = {description} subTitle = {planOffer}/>
        <DetailCardRow value = {downloadSpeed} icon= {result(ICON_MAP, 'DOWNLOAD.titleIconPath', '')} title= {result(ICON_MAP, 'DOWNLOAD.titleText', '')} unit={unit}/>
        <DetailCardRow value = {uploadSpeed} icon= {result(ICON_MAP, 'UPLOAD.titleIconPath', '')} title= {result(ICON_MAP, 'UPLOAD.titleText', '')} unit={unit} showSeparator={false}/>
        {/* {wifi && <DetailCardRow rowData = {wifi} type = 'wifi' />}
        {wifiRouter && <DetailCardRow rowData = {wifiRouter} type = 'wifiRouter'/>} */}
      </WrapperCard>

    );
  }
}
TOLPackageDetails.defaultProps = {
  packageDetails: {},
  packageInfo: {},
  isConvergence: false,
  productId: ''
};
TOLPackageDetails.propTypes = {
  packageDetails: Proptypes.object,
  packageInfo: Proptypes.object,
  isConvergence: Proptypes.bool,
  productId: Proptypes.string
};
export default TOLPackageDetails;
