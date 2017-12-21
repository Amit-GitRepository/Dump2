/* BillUsage: entry point to bills and usage main screen*/

import bannerImage from '../../../assets/bill_usage_banner.jpg';
import BillSummaryWrapper from './TopLevelCards/BillSummaryWrapper/BillSummaryWrapper.component';
import noop from 'lodash/noop';
import PrepaidWrapper from './TopLevelCards/PrepaidWrapper/PrepaidWrapper.component';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './BillUsage.style';
import {availablePackage} from '../mockData';
import {Banner, ISText} from '../../Shared';
import {ScrollView, View} from 'react-native';
import {some} from 'lodash';
import {translate} from '../../../language/i18n/helper';

class BillUsage extends Component {
  render () {
    const {username, goToScreen, productList, toggleBillDetailCheck, onBillDetailsClick, productDetail, billDetail, getProductBillDetails, toggleProductCheck, toggleProductCollapse, setPaymentItems, getProductCurrentUsage, currentLanguage} = this.props;
    const {tmhPostpaid, conv, tol, tvs, tmhPrepaid} = productList;
    const billSummaryProductList = {tmhPostpaid, conv, tol, tvs};
    const prepaidList = {tmhPrepaid};
    const hasBillSummary = some(billSummaryProductList, (elem) => elem && elem.length > 0);
    const hasPrepaidList = some(prepaidList, (elem) => elem && elem.length > 0);
    return (
      <ScrollView contentContainerStyle={styles.container} accessibilityLabel='Bills&Usage_container'>
        <Banner source={bannerImage} style={styles.bannerContainer}>
          <ISText style={styles.welcomeText} type='BOLD'>{translate('BILLS_USAGE_WELCOME')}</ISText>
          <ISText style={styles.usernameText} type='BOLD'>{username}</ISText>
        </Banner>
        <View style={styles.productContainer}>
          {
            hasBillSummary ?
              <BillSummaryWrapper productList={billSummaryProductList} billDetail={billDetail} productDetail={productDetail}
                getProductBillDetails={getProductBillDetails} toggleProductCheck={toggleProductCheck} toggleProductCollapse={toggleProductCollapse}
                goToScreen={goToScreen} toggleBillDetailCheck={toggleBillDetailCheck} setPaymentItems={setPaymentItems} onBillDetailsClick={onBillDetailsClick} getProductCurrentUsage={getProductCurrentUsage} currentLanguage={currentLanguage}/> :
              null
          }
          {
            hasPrepaidList ?
              <PrepaidWrapper productList={prepaidList} containerStyle={hasBillSummary ? styles.separatorPadding : {}} productDetail={productDetail} toggleProductCollapse={toggleProductCollapse} goToScreen={goToScreen} availablePackage={availablePackage} setPaymentItems={setPaymentItems}/> :
              null
          }
        </View>
      </ScrollView>
    );
  }
}

BillUsage.defaultProps = {
  username: '',
  goToScreen: noop,
  productList: {
    tmhPostpaid: [],
    conv: [],
    tol: [],
    tvs: [],
    tmhPrepaid: []
  },
  productDetail: {},
  billDetail: {},
  toggleProductCheck: noop,
  toggleProductCollapse: noop,
  getProductBillDetails: noop,
  toggleBillDetailCheck: noop,
  onBillDetailsClick: noop,
  setPaymentItems: noop,
  getProductCurrentUsage: noop,
  currentLanguage: 'th'
};

BillUsage.propTypes = {
  username: Proptypes.string,
  goToScreen: Proptypes.func,
  productList: Proptypes.PropTypes.shape({
    tmhPostpaid: Proptypes.array,
    conv: Proptypes.array,
    tol: Proptypes.array,
    tvs: Proptypes.array,
    tmhPrepaid: Proptypes.array
  }),
  productDetail: Proptypes.object,
  billDetail: Proptypes.object,
  toggleProductCheck: Proptypes.func,
  toggleProductCollapse: Proptypes.func,
  getProductBillDetails: Proptypes.func,
  toggleBillDetailCheck: Proptypes.func,
  onBillDetailsClick: Proptypes.func,
  setPaymentItems: Proptypes.func,
  getProductCurrentUsage: Proptypes.func,
  currentLanguage: Proptypes.string
};

export default BillUsage;
