/*
 * Popup container is used to display messages such as errors, information and confirm
 * Used throughout the application
 */

/*
 * message payload looks like
 *

 const message = {
   title: translate('BILLING_METHODS__ADD_GO_PAPERLESS'),
   body: translate('BILLING_METHODS__ADD_BODY_PAPERLESS'),
   buttons: [
     {
       title: translate('BILLING_METHODS__ADD_CANCEL')
     },
     {
       title: translate('BILLING_METHODS__ADD_CONFIRM'),
       action: APPLY_FOR_EBILL, // action Constant to fire
       nextAction: accounts // payload or next action
     }
   ]
 };

 * message object accepts the following:
 * title is the header of popup
 * body is the message to be displayed
 * buttons is an array of button objects - Minimum buttons 0
 * Maximum buttons 2
 * order of the buttons will depend on UI
 */
import PopupComponent from '../../components/Shared/Popup/Popup.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {hidePopup,  popupPutAction} from '../../redux/actions/index.actions';

class Popup extends Component {
  render () {
    const {isOpen, message, hidePopup, popupPutAction} = this.props;

    return (
      <PopupComponent
        showPrompt={isOpen}
        message={message}
        hidePopup={hidePopup}
        popupPutAction={popupPutAction}
      />
    );
  }
}

Popup.propTypes = {
  hidePopup: PropTypes.func,
  message: PropTypes.object,
  isOpen: PropTypes.bool,
  popupPutAction: PropTypes.func
};

export const mapStateToProps = (state) => ({
  message: result(state, 'popup.message'),
  isOpen: result(state, 'popup.isOpen')
});

export const mapDispatchToProps = (dispatch) => ({
  hidePopup: () => dispatch(hidePopup()),
  popupPutAction: (value) => dispatch(popupPutAction(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
