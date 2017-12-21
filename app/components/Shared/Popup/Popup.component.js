import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './Popup.style';
import {Button, ISText, Modal} from '../../Shared';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class Popup extends Component {
  state = {
    actionObject: {}
  };

  hidePopupAndCallAction = (actionObject) => () => {
    this.setState({actionObject});
    this.props.hidePopup();
  }

  callAction = () => {
    const {actionType, nextAction} = this.state.actionObject;
    if (this.state.actionObject !== null && actionType) {
      this.props.popupPutAction({type: actionType, payload: nextAction});
    }
  }

  generateActionButton = (type, actionObject) => {
    // to provide a default okay button in case button array is empty
    const buttonObject = actionObject || {title: translate('BUTTON__OK')};
    return (
      <Button
        type={type}
        onPress={this.hidePopupAndCallAction(buttonObject)}
        touchableStyle={styles.button}
        text={buttonObject.title}
        style={type === 'secondary' ? styles.cancelButtonContainer : {}}
        textStyle={type === 'secondary' ? styles.cancelButtonText : {}}
      />
    );
  }

  render () {
    const {showPrompt, message} = this.props;
    const actionButtons = result(message, 'buttons', []);

    return (
      <Modal isVisible={showPrompt} animationIn={'zoomIn'} animationOut={'zoomOut'}
        onModalHide={this.callAction} onBackdropPress={this.hidePopupAndCallAction({})}>
        <View style={styles.container}>
          <ISText style={styles.headerText} type='BOLD'>{message.title}</ISText>
          <ISText style={styles.headerText}>{message.body}</ISText>
          <View style={styles.buttonContainer}>
            {actionButtons.length === 2
              ? this.generateActionButton(
                'secondary',
                actionButtons[0]
              )
              : null}
            {this.generateActionButton(
              'primary',
              actionButtons[actionButtons.length - 1]
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

Popup.defaultProps = {
  showPrompt: false,
  hidePopup: noop,
  message: {
    title: '',
    body: '',
    buttons: [
      {
        title: ''
      }
    ]
  }
};

Popup.propTypes = {
  showPrompt: PropTypes.bool,
  message: PropTypes.object,
  hidePopup: PropTypes.func,
  popupPutAction: PropTypes.func
};

export default Popup;
