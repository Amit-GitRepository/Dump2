
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './TMPackageDetailsExtra.style';
import TMExtraPackage from './TMExtraPackage.component';
import TMPackageDetails from './TMPackageDetails.component';
import {CaretTabs} from '../../Shared';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class TMPackageDetailsExtra extends Component {
  state = {
    selectedTabIndex: 0
  }

  onTabPress = (selectedTabIndex) => {
    this.setState({selectedTabIndex});
  }
  render () {
    const {pricePlanInfo, isPrepaid, mainPackage,  extraPackage, billCycle, creditLimit, offerDesc, phoneNumber} = this.props;
    const {selectedTabIndex} = this.state;
    const headerList = [{
      text: translate('PACKAGE_DETAIL__TITLE')
    }, {
      text: translate('EXTRA_PACKAGE_TITLE')
    }];

    return (
      <View style={styles.container}>
        {isPrepaid ?  <TMExtraPackage mainPackage={mainPackage} extraPackage={extraPackage} isPrepaid={isPrepaid}/> : <CaretTabs onTabPress={this.onTabPress} selectedIndex={selectedTabIndex} headerList={headerList} headerContainerStyle={styles.caretTabContainer} bodyStyle={styles.bodyStyle}>
          {selectedTabIndex === 0 && <TMPackageDetails mainPackage={mainPackage} pricePlanInfo={pricePlanInfo} billCycle={billCycle} creditLimit={creditLimit} offerDesc={offerDesc} isPrepaid={isPrepaid} phoneNumber={phoneNumber}/>}
          {selectedTabIndex === 1 && <TMExtraPackage mainPackage={mainPackage} extraPackage={extraPackage} isPrepaid={isPrepaid}/>}
        </CaretTabs>}
      </View>
    );
  }
}

TMPackageDetailsExtra.defaultProps = {
  pricePlanInfo: {},
  mainPackage: [],
  extraPackage: [],
  billCycle: {},
  creditLimit: '',
  offerDesc: '',
  isPrepaid: false,
  phoneNumber: ''
};

TMPackageDetailsExtra.propTypes = {
  pricePlanInfo: PropTypes.object,
  mainPackage: PropTypes.array,
  extraPackage: PropTypes.array,
  billCycle: PropTypes.object,
  creditLimit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offerDesc: PropTypes.string,
  isPrepaid: PropTypes.bool,
  phoneNumber: PropTypes.string
};

export default TMPackageDetailsExtra;
