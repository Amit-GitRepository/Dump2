// import Proptypes from 'prop-types';
import React, {Component} from 'react';
import TMBillDetail from '../../components/BillUsage/BillDetails/TMBillDetail.component';
import {billDetail} from '../../components/BillUsage/mockData.js';
import {connect} from 'react-redux';

class TMoveBillDetailPage extends Component {
  render () {
    return (
      <TMBillDetail billDetailInfo={billDetail}/>
    );
  }
}

TMoveBillDetailPage.propTypes = {
//
};

export default connect(null, null)(TMoveBillDetailPage);
