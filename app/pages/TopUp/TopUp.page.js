import ComponentWithTab from '../../components/ComponentWithTab/ComponentWithTab.component';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';
import result from 'lodash/result';
import TopUp from '../../components/TopUp/TopUp/TopUp.component';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {setPaymentItems} from '../../redux/actions/index.actions';

class TopUpPage extends ComponentWithTab {
  // TODO make api call to get product list to handle deeplinking
  renderWithTab () {
    const {tmhPrepaid, goToScreen, setPaymentItems} = this.props;
    const prepaidNumbers = [];
    tmhPrepaid.forEach((item) => {
      prepaidNumbers.push(item.productId);
    });
    return (
      <TopUp goToScreen={goToScreen} prepaidNumbers={prepaidNumbers} setPaymentItems={setPaymentItems}/>
    );
  }
}

TopUpPage.defaultProps = {
  tmhPrepaid: [],
  goToScreen: noop,
  setPaymentItems: noop
};

TopUpPage.propTypes = {
  tmhPrepaid: PropTypes.array,
  goToScreen: PropTypes.func,
  setPaymentItems: PropTypes.func
};

export const mapStateToProps = (state) => ({
  tmhPrepaid: result(state, 'billUsage.productList.tmhPrepaid', [])
});

export const mapDispatchToProps = (dispatch) => ({
  goToScreen: (screen) => dispatch(NavigationActions.navigate({routeName: screen})),
  setPaymentItems: (items) => dispatch(setPaymentItems(items))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopUpPage);
