import Proptypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import TMPackageDetailsExtra from '../../components/BillUsage/TMPackageDetailsExtra/TMPackageDetailsExtra.component';
import {connect} from 'react-redux';
import {unformatPhoneNumber} from '../../utils/common.util';

class TMPackageDetailsExtraPage extends Component {
  render () {
    const {isPrepaid = false, subscriberId, productType, title} = this.props.navigation.state.params;
    const productDetail =  result(this.props.productDetail, `${productType}.${subscriberId}`, {});
    return (
      <TMPackageDetailsExtra pricePlanInfo={result(productDetail, 'PRICE_PLAN_INFO', {})} isPrepaid={isPrepaid}
        mainPackage={result(productDetail, 'BUNDLE_USAGE.MAIN_PACKAGE', [])} extraPackage={result(productDetail, 'BUNDLE_USAGE.EXTRA_PACKAGE', [])}
        billCycle={result(productDetail, 'BUNDLE_USAGE.BILL_CYCLE', {})} creditLimit={result(productDetail, 'CREDIT_LIMIT', '')}
        offerDesc={result(productDetail, 'OFFER_DESC', '')} phoneNumber={unformatPhoneNumber(title)}/>
    );
  }
}

TMPackageDetailsExtraPage.defaultProps = {
  navigation: {},
  productDetail: {}
};
TMPackageDetailsExtraPage.propTypes = {
  navigation: Proptypes.object,
  productDetail: Proptypes.object
};

export const mapStateToProps = (state) => ({
  productDetail: result(state, 'billUsage.productDetail', {})
});

export default connect(mapStateToProps)(TMPackageDetailsExtraPage);
