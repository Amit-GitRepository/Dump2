import BillingMethods from '../../components/BillingMethods/BillingMethods/BillingMethods.component';
import ComponentWithTab from '../../components/ComponentWithTab/ComponentWithTab.component';
import PropTypes from 'prop-types';
import React from 'react';
import {billFormats} from '../../config/ebill.config';
import {connect} from 'react-redux';
import {every, forEach, map, result, union, uniq} from 'lodash';
import {NavigationActions} from 'react-navigation';
import {View} from 'react-native';
import * as actions from '../../redux/actions/index.actions';

class BillingMethodsPage extends ComponentWithTab {

  componentWillMount () {
    this.props.getBillingPreference(this.getAccountIds(this.props.productList));
  }

  getAccountIds = (productList) => {
    const accountIds = [];
    forEach(productList, (array, key) => {
      if (key === 'tmhPrepaid') {
        return;
      }

      if (key === 'conv') {
        // so for convergence account - All the accounts for which
        // convergenceCode is same && isBillConsolidated
        // then use any one of the accountIds
        // otherwise use all the accountIds individually
        map(array, (val) => {
          const productList = result(val, 'products', []);
          if (every(productList, (item) => item.isBillConsolidated)) {
            accountIds.push(productList[0].accountId);
          } else {
            map(productList, (item) => {
              accountIds.push(item.accountId);
            });
          }
        });
      } else {
        map(array, (val) => {
          accountIds.push(val.accountId);
        });
      }
    });
    return uniq(accountIds);
  }

  navigateToScreen = (screen) => (params = {}) => {
    this.props.goToScreen(screen, params);
  }

  renderWithTab () {
    const {billPreference} = this.props;
    return (
      <View>
        <BillingMethods
          ebillContent={union(billPreference[billFormats.EMAIL] || [], billPreference[billFormats.SMS] || [])}
          paperBillContent={billPreference[billFormats.PAPER] || []}
          onApplyEbillAction={this.navigateToScreen('EbillAdd')}
          onEditEbillAction={this.navigateToScreen('EbillEdit')}
        />
      </View>
    );
  }
}

BillingMethodsPage.propTypes = {
  goToScreen: PropTypes.func,
  productList: PropTypes.object,
  billPreference: PropTypes.object,
  getBillingPreference: PropTypes.func
};

const mapStateToProps = (state) => ({
  productList: result(state, 'billUsage.productList', {}),
  billPreference: result(state, 'ebill.billPreference', {})
});

export const mapDispatchToProps = (dispatch) => ({
  goToScreen: (screenName, params) => dispatch(NavigationActions.navigate({routeName: screenName, params})),
  getBillingPreference: (accountIds) => dispatch(actions.getBillingPreference(accountIds))
});

export default connect(mapStateToProps, mapDispatchToProps)(BillingMethodsPage);
