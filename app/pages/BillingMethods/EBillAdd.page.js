import EBillAdd from '../../components/BillingMethods/EBillAdd/EBillAdd.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import {billFormats} from '../../config/ebill.config';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/index.actions';

class EBillAddPage extends Component {
  render () {
    const {billPreference, showPopup} = this.props;
    return (
      <EBillAdd
        paperBillContent={billPreference[billFormats.PAPER] || []}
        showPopup={showPopup}
      />
    );
  }
}

EBillAddPage.propTypes = {
  billPreference: PropTypes.object,
  showPopup: PropTypes.func
};

const mapStateToProps = (state) => ({
  billPreference: result(state, 'ebill.billPreference', {})
});

export const mapDispatchToProps = (dispatch) => ({
  showPopup: (value) => dispatch(actions.showPopup(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(EBillAddPage);
