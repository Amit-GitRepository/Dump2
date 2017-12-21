import DetailCardRow from '../BillUsage/BillUsageShared/DetailCardRow.component';
import HeaderWithCaret from '../BillUsage/BillUsageShared/HeaderWithCaret.component';
import PackageDetailHeader from '../BillUsage/BillUsageShared/PackageDetailHeader/PackageDetailHeader.component';
import PackageOverview from '../BillUsage/BillUsageShared/PackageOverview/PackageOverview.component';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './TVPackageDetails.style';
import {ICON_MAP} from '../../../config/billUsage.config';
import {translate} from '../../../language/i18n/helper';
import {WrapperCard} from '../../Shared';

class TVPackageDetails extends Component {

  render () {
    const {packageInfo, packageDetails, isConvergence, endDate, productId} = this.props;
    const type = ICON_MAP[type];
    return (
      <WrapperCard style={styles.container} contentContainerStyles={styles.contentContainerStyles}>
        <HeaderWithCaret headerColor = {styles.headerColor} customIconStyle = {styles.iconStyle} style = {styles.headerStyle}>
          <PackageDetailHeader isConvergence = {isConvergence} phoneNumber = {productId} endDate ={endDate} name = {translate('BILLS_USAGE_TRUEVISIONS')}/>
        </HeaderWithCaret>
        <PackageOverview title = {packageInfo.description} subTitle = {packageInfo.planOffer}/>
        {/* Default value = 0 , added as per discussion with design team, TODO: Remove this when API up*/}
        <DetailCardRow icon = {result(ICON_MAP, 'HDCHANNELS.titleIconPath', '')} title= {result(ICON_MAP, 'HDCHANNELS.titleText', '')} value={packageDetails.channelCountHD || 0} subText = {'Channels'}/>
        <DetailCardRow icon = {result(ICON_MAP, 'CHANNELS.titleIconPath', '')} title= {result(ICON_MAP, 'CHANNELS.titleText', '')} value={packageDetails.channelCountSD || 0} subText = {'Channels'} showSeparator={false}/>
        {/* {additionalOffers.map((Offer, index) => <DetailCardRow key = {index} rowData = {Offer}/>)}
        <ISText type = 'SEMIBOLD' style = {styles.footerText} >{'*Equipment deposite 1,000 Baht'}</ISText>
        not sure where this text was coming from hence added constant value for now */}
      </WrapperCard>
    );
  }
}
TVPackageDetails.defaultProps = {
  packageDetails: {},
  isConvergence: false,
  packageInfo: {},
  productId: '',
  endDate: 0
};
TVPackageDetails.propTypes = {
  packageDetails: Proptypes.object.isRequired,
  isConvergence: Proptypes.bool,
  packageInfo: Proptypes.object,
  productId: Proptypes.string,
  endDate: Proptypes.number
};
export default TVPackageDetails;
