import PayOthersTopUp from '../../../components/Payment/PayOthersTopUp/PayOthersTopUp.component';
import Proptypes from 'prop-types'; 
import React, {Component} from 'react';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {setPaymentItems} from '../../../redux/actions/index.actions'; 

class PayForOtherTopUpPage extends Component {
  render () {
    const {serviceNo, goToScreen, setPaymentItems, product} = this.props;
    return (<PayOthersTopUp serviceNo={serviceNo} setPaymentItems={setPaymentItems} goToScreen={goToScreen} product={product}/>);
  }
}

PayForOtherTopUpPage.propTypes = {
  serviceNo: Proptypes.string,
  setPaymentItems: Proptypes.func,
  goToScreen: Proptypes.func,
  product: Proptypes.object
};

const mapStateToProps = ({payForOthers}) => ({
  serviceNo: result(payForOthers, 'serviceNo', {}),
  product: result(payForOthers, 'product', {})
});

const mapDispatchToProps = (dispatch) => ({
  goToScreen: (screenName, params = {}) => dispatch(NavigationActions.navigate({routeName: screenName, params})),
  setPaymentItems: (items) => dispatch(setPaymentItems(items))
});

export default connect(mapStateToProps, mapDispatchToProps)(PayForOtherTopUpPage);
