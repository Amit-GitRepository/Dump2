import CurrentUsageCard from '../CurrentUsageCard/CurrentUsageCard.component';
import CurrentUsageTM from '../CurrentUsageTM/CurrentUsageTM.component';
import ProductCardTitle from '../ProductCardTitle/ProductCardTitle.component';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './CurrentUsageTConv.style';
import TConvProductBaseCard from './TConvProductBaseCard.component';
import {ICON_MAP, PRODUCT_TYPE, TOL_SPEED_TYPES} from '../../../../../config/billUsage.config';
import {noop, result} from 'lodash';
import {View} from 'react-native';

class CurrentUsageTConv extends Component {
  navigateToPackagePromoPage = () => {
    this.props.goToScreen('PackagePromoPage', {url: 'https://iservice.truecorp.co.th'});
  }
  render () {
    const {productDetail, products, onCollapseToggle, goToScreen, currentLanguage} = this.props;
    return (
      <View style={styles.currentUsageContainer}>
        {products.map((product, index) => {
          let currentUsage = null;
          let goToPackageDetail = noop;
          let subtitle = '';
          const {subscriberId, productId, productType, subscriptionType} = product;
          const productData = result(productDetail, `${subscriberId}`, {});
          const planInfo = result(productData, 'PRICE_PLAN_INFO', {});
          if (productData) {
            switch (productType) {
            case PRODUCT_TYPE.TRUEONLINE: {
              const {downloadSpeed, uploadSpeed, unit, imageURL} = result(productData, `TOL_SPEEDS.${currentLanguage}`, {});
              const packageData = [{usage: downloadSpeed, unit: unit, type: TOL_SPEED_TYPES.DOWNLOAD}, {usage: uploadSpeed, unit: unit, type: TOL_SPEED_TYPES.UPLOAD}];
              goToPackageDetail = () => goToScreen('TOLPackageDetail', {productId: productId, productType: 'conv', subscriberId});
              currentUsage = <CurrentUsageCard data={packageData} bannerSrc={imageURL} onBannerClick={this.navigateToPackagePromoPage} textStyle={styles.usageText}/>;
              break;
            }
            case PRODUCT_TYPE.TRUEVISION: {
              const {channelCountHD, channelCountSD, imageURL} = result(productData, `TVS_PACKAGES.${currentLanguage}`, {});

              const packageData = [{usage: channelCountHD, type: ICON_MAP.HDCHANNELS.titleText}, {usage: channelCountSD, type: ICON_MAP.CHANNELS.titleText}];
              goToPackageDetail = () => goToScreen('TVPackageDetail', {productId: productId, productType: 'conv', subscriberId});
              currentUsage = <CurrentUsageCard data={packageData} bannerSrc={imageURL} onBannerClick={this.navigateToPackagePromoPage} textStyle={styles.usageText}/>;
              break;
            }
            case PRODUCT_TYPE.TRUEMOVEH: {
              const noOfExtraPackages = result(productData, 'BUNDLE_USAGE.EXTRA_PACKAGE', []).length;
              subtitle = noOfExtraPackages > 0  ? `(${noOfExtraPackages} Extra Packages)` : null;
              goToPackageDetail = () => goToScreen('TMPackageDetailsExtra', {title: productId, productType: 'conv', subscriberId});
              currentUsage = <CurrentUsageTM usageData={productData.BUNDLE_USAGE} sharedNumbers={productData.SHARED_PLAN_INFO} multiSimNumbers={productData.MULTI_SIM_INFO}/>;
            }
            }
          }
          return (
            <TConvProductBaseCard key={index} product={product} isLast={(products.length - 1) === index} onCollapseToggle={onCollapseToggle('tmhPostpaid', subscriberId, productId, productType, subscriptionType)}>
              <ProductCardTitle text={planInfo.description} navigate={goToPackageDetail} subtext={subtitle}/>
              <View style={styles.currentUsageSection}>
                {currentUsage}
              </View>
            </TConvProductBaseCard>
          );
        })}
      </View>
    );
  }
}

CurrentUsageTConv.defaultProps = {
  products: [],
  productDetail: {},
  onCollapseToggle: noop,
  goToScreen: noop,
  currentLanguage: ''
};

CurrentUsageTConv.propTypes = {
  products: Proptypes.array,
  productDetail: Proptypes.object,
  onCollapseToggle: Proptypes.func,
  goToScreen: Proptypes.func,
  currentLanguage: Proptypes.string
};

export default CurrentUsageTConv;
