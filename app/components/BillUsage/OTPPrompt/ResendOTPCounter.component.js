import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {ISText} from '../../Shared';
import {translate} from '../../../language/i18n/helper';

class ResendOTPCounter extends Component {

  state = {
    counter: this.props.time
  };

  resendOTP = () => {
    if (!this.state.counter) {
      this.props.sendOTP();
      this.setState({counter: this.props.time});
      this.startTimer();
    }
  }

  updateCounter = () => {
    const {counter} = this.state;
    if (counter > 0) {
      this.setState({
        counter: (counter - 1)
      });
    } else {
      clearInterval(this.interval);
    }
  }

  startTimer = () => {
    var superThis = this;
    this.interval = setInterval(function () {
      superThis.updateCounter();
    }, 1000);
  }

  componentWillMount () {
    this.startTimer();
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  render () {
    return <ISText type={'SEMIBOLD'} onPress={this.resendOTP}>{
      this.state.counter
        ? translate('OTP_RESEND_MSG', {time: this.state.counter})
        : translate('OTP_RESEND')
    }</ISText>;
  }
}

ResendOTPCounter.defaultProps = {
  time: 0,
  sendOTP: noop
};

ResendOTPCounter.propTypes = {
  time: PropTypes.number,
  sendOTP: PropTypes.func
};

export default ResendOTPCounter;
