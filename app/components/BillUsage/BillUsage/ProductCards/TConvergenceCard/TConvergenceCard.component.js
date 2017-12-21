import bannerImage from '../../../../../assets/bill_usage_banner.jpg';
import BaseProductCard from '../BaseProductCard/BaseProductCard.component';
import BaseProductCollapsibleBar from '../BaseProductCollapsibleBar/BaseProductCollapsibleBar.component';
import noop from 'lodash/noop';
import Proptypes from 'prop-types';
import React from 'react';
import styles from './TConvergenceCard.style';
import {BillHistoryList, CurrentUsageTConv, ProductCardTitle} from '../../BillUsageShared';
import {CaretTabs} from '../../../../../components/Shared';
import {translate} from '../../../../../language/i18n/helper';
import {View} from 'react-native';

class TConvergenceCard extends BaseProductCard {

  state = {
    selectedTabIndex: this.props.defaultSelectedTab,
    isCollapsed: this.props.isCollapsed,
    totalAmount: this.props.amount
  }

  onTabPress = (selectedTabIndex) => {
    if (selectedTabIndex === 1 && !this.props.dueBills) {
      this.props.getDueBills();
    }
    this.setState({selectedTabIndex});
  }

  onCollapseToggle = () => {
    this.setState({isCollapsed: !this.state.isCollapsed});
    if (this.state.selectedTabIndex === 1 && !this.props.dueBills) {
      this.props.getDueBills();
    }
  }

  render () {
    const {dueBills, plan, amount, subtitle, products, productDetail, status, onChecked, isChecked, onCollapseToggle, goToScreen, onBillDetailsClick, currentLanguage} = this.props;
    const {totalAmount, isCollapsed, selectedTabIndex} = this.state;
    const headerList = [{text: translate('BILLS_USAGE_CURRENT_USAGE')}, {text: translate('BILLS_USAGE_BILL_DETAILS')}];
    return (
      <BaseProductCollapsibleBar checkboxDisabled={!(amount > 0)} status={status} type={'SMARTCHOICE'} leftTitleText={translate('BILLS_USAGE_TRUESMARTCHOICE')} amountText={totalAmount} isCollapsed={isCollapsed} onCollapseToggle={this.onCollapseToggle} onChecked={onChecked} isChecked={isChecked}>
        <View style={styles.container}>
          <View style={styles.productTitle}>
            <ProductCardTitle text={plan} subtext={subtitle}/>
          </View>
          <CaretTabs onTabPress={this.onTabPress} selectedIndex={selectedTabIndex} headerList={headerList} bodyStyle={styles.tabContainer}>
            {selectedTabIndex === 0 && <CurrentUsageTConv productDetail={productDetail} products={products} bannerImage={bannerImage} textStyle={styles.usageText} onCollapseToggle={onCollapseToggle} goToScreen={goToScreen} currentLanguage={currentLanguage}/>}
            {selectedTabIndex === 1 && <BillHistoryList onBillDetailsClick={onBillDetailsClick} dueBills={dueBills} onBillToggle={this.onBillToggle} />}
          </CaretTabs>
        </View>
      </BaseProductCollapsibleBar>
    );
  }
}

TConvergenceCard.defaultProps = {
  amount: 0,
  plan: '',
  subtitle: '',
  products: [],
  productDetail: {},
  status: 'ACTIVE',
  isCollapsed: true,
  onCollapseToggle: noop,
  onBillDetailsClick: noop,
  onChecked: noop,
  isChecked: false,
  getDueBills: noop,
  goToScreen: noop,
  defaultSelectedTab: 0,
  currentLanguage: 'th'
};

TConvergenceCard.propTypes = {
  amount: Proptypes.number,
  plan: Proptypes.string,
  subtitle: Proptypes.string,
  dueBills: Proptypes.array,
  products: Proptypes.array,
  productDetail: Proptypes.object,
  onCollapseToggle: Proptypes.func,
  onBillDetailsClick: Proptypes.func,
  status: Proptypes.string,
  isCollapsed: Proptypes.bool,
  onChecked: Proptypes.func,
  isChecked: Proptypes.bool,
  getDueBills: Proptypes.func,
  goToScreen: Proptypes.func,
  defaultSelectedTab: Proptypes.number,
  currentLanguage: Proptypes.string
};

export default TConvergenceCard;
