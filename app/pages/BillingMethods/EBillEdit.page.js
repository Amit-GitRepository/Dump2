import assign from 'lodash/assign';
import EBillEdit from '../../components/BillingMethods/EBillEdit/EBillEdit.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import {billFormats} from '../../config/ebill.config';
import {connect} from 'react-redux';
import {translate} from '../../language/i18n/helper';
import * as actions from '../../redux/actions/index.actions';

class EBillEditPage extends Component {
  state = {
    account: result(this.props.navigation, 'state.params.account', {})
  }

  saveEbillAccount = (data) => {
    const account = assign({}, data, {
      accountId: this.state.account.accountId,
      accountType: this.state.account.accountType
    });

    let header = translate('BILLING_METHODS__ADD_GO_PAPERLESS');
    let body = translate('BILLING_METHODS__ADD_BODY_PAPERLESS');

    switch (account.billingFormat) {
    case billFormats.PAPER: {
      header = translate('BILLING_METHODS__ADD_GO_PAPER');
      body = translate('BILLING_METHODS__ADD_BODY_PAPER');
      break;
    }
    case billFormats.SMS: {
      body = translate('BILLING_METHODS__ADD_BODY_SMS');
      break;
    }
    case billFormats.EMAIL: {
      body = translate('BILLING_METHODS__ADD_BODY_EMAIL');
      break;
    }
    default: {
      // do nothing
    }
    }

    const message = {
      title: header,
      body: body,
      buttons: [
        {
          title: translate('BILLING_METHODS__ADD_CANCEL')
        },
        {
          title: translate('BILLING_METHODS__ADD_CONFIRM'),
          actionType: actions.APPLY_FOR_EBILL,
          nextAction: [account]
        }
      ]
    };
    this.props.showPopup(message);
  }
  render () {
    const {accountType, billingFormat, productId, billingValue} = this.state.account;
    return (
      <EBillEdit
        accountType={accountType}
        billingFormat={billingFormat}
        productId={productId || ''}
        defaultMSISDN={billingFormat === 'SMS' ? billingValue : (accountType === 'tmhPostpaid' ? productId : null)}
        defaultEmail={billingFormat === 'EMAIL' ? billingValue : null}
        onSaveAction={this.saveEbillAccount}
      />
    );
  }
}

EBillEditPage.propTypes = {
  navigation: PropTypes.object.isRequired,
  showPopup: PropTypes.func
};

const mapStateToProps = () => ({});

export const mapDispatchToProps = (dispatch) => ({
  showPopup: (value) => dispatch(actions.showPopup(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(EBillEditPage);
