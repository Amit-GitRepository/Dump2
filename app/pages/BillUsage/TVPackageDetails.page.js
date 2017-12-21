import Proptypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import TVPackageDetails from '../../components/BillUsage/TVPackageDetails/TVPackageDetails.component';
import {connect} from 'react-redux';

class TVPackageDetailsPage extends Component {
  render () {
    const {subscriberId, productType, productId} = this.props.navigation.state.params;
    const productDetail =  result(this.props.productDetail, `${productType}.${subscriberId}`, {});
    const tvsPackageDetail = result(productDetail, `TVS_PACKAGES.${this.props.currentLanguage}`, {});
    return (
      <TVPackageDetails packageDetails = {tvsPackageDetail} packageInfo = {productDetail.PRICE_PLAN_INFO} productId={productId}/>
    );
  }
}

TVPackageDetailsPage.defaultProps = {
  navigation: {},
  productDetail: {},
  currentLanguage: 'th'
};
TVPackageDetailsPage.propTypes = {
  navigation: Proptypes.object,
  productDetail: Proptypes.object,
  currentLanguage: Proptypes.string
};

export const mapStateToProps = (state) => ({
  productDetail: result(state, 'billUsage.productDetail', {}),
  currentLanguage: result(state, 'user.language', 'th')
});

export default connect(mapStateToProps)(TVPackageDetailsPage);
