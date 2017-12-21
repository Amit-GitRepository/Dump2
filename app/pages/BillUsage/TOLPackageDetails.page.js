import Proptypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import TOLPackageDetails from '../../components/BillUsage/TOLPackageDetails/TOLPackageDetails.component';
import {connect} from 'react-redux';

class TOLPackageDetailsPage extends Component {
  render () {
    const {subscriberId, productType, productId} = this.props.navigation.state.params;
    const productDetail =  result(this.props.productDetail, `${productType}.${subscriberId}`, {});
    const tolPackageDetail = result(productDetail, `TOL_SPEEDS.${this.props.currentLanguage}`, {});
    return (
      <TOLPackageDetails packageDetails = {tolPackageDetail} packageInfo={result(productDetail, 'PRICE_PLAN_INFO', {})} productId={productId}/>
    );
  }
}

TOLPackageDetailsPage.defaultProps = {
  navigation: {},
  productDetail: {},
  currentLanguage: 'th'
};
TOLPackageDetailsPage.propTypes = {
  navigation: Proptypes.object,
  productDetail: Proptypes.object,
  currentLanguage: Proptypes.string
};

export const mapStateToProps = (state) => ({
  productDetail: result(state, 'billUsage.productDetail', {}),
  currentLanguage: result(state, 'user.language', 'th')
});

export default connect(mapStateToProps)(TOLPackageDetailsPage);
