import Modal from 'react-native-modal';
import React from 'react';
import {colors} from '../../../themes/constants.styles';

const CustomModal = ({...props}) => <Modal backdropColor={colors.BACKDROP_COLOR} backdropOpacity={1} {...props} />;
/*
propTypesForModal = {
  animationIn: PropTypes.string,
  animationInTiming: PropTypes.number,
  animationOut: PropTypes.string,
  animationOutTiming: PropTypes.number,
  backdropColor: PropTypes.string,
  backdropOpacity: PropTypes.number,
  backdropTransitionInTiming: PropTypes.number,
  backdropTransitionOutTiming: PropTypes.number,
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onModalShow: PropTypes.func,
  onModalHide: PropTypes.func,
  onBackButtonPress: PropTypes.func,
  onBackdropPress: PropTypes.func,
  style: PropTypes.any
}
*/
export default CustomModal;
