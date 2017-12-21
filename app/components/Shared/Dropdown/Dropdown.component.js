import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Dropdown.styles.js';
import {Button, Card, Icon, ISText, List, Modal, Touchable} from '../../Shared';
import {colors, fonts} from '../../../themes/constants.styles';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class Dropdown extends Component {
  state = {
    isVisible: false
  };

  showModal = () => this.setState({isVisible: true});
  hideModal = () => this.setState({isVisible: false});

  selectItem = (item) => () => {
    if (item !== this.props.value) {
      this.props.onSelect(item); // don't call onSelect if the value is same
    }
    this.hideModal();
  }
  render () {
    const {accessibilityLabel, data, unselectedText, value, style, testID} = this.props;
    const modalHeaderText = this.props.headerText || this.props.unselectedText;
    return (
      <View style={styles.container} accessibilityLabel={accessibilityLabel} testID={testID}>
        <Touchable onPress={this.showModal} style={{...styles.touchableContainer, ...style}} >
          <View style={styles.viewContainer}>
            <ISText style= {styles.title} type={'BOLD'}>{value || unselectedText}</ISText>
            <Icon name={'caret-down'} size={fonts.FONT_SIZE_XL} color={colors.PRIMARY_ACTIONABLE} style={styles.downArrow}/>
          </View>
        </Touchable>

        <Modal isVisible={this.state.isVisible} animationIn={'zoomIn'} animationOut={'zoomOut'}
          animationInTiming={1} backdropTransitionInTiming={1} backdropTransitionOutTiming={1}
          animationOutTiming={1} onBackdropPress={this.hideModal}>
          <Card header={modalHeaderText} >
            <View style={styles.listContainer}>
              <List data={data} alignListItemsCenter onPress={this.selectItem} arrowVisibility={false}/>
            </View>
          </Card>
          <Button onPress={this.hideModal} text={translate('STORE_LOCATOR__CANCEL')} style={styles.cancelButton}/>
        </Modal>
      </View>
    );
  }
}

Dropdown.defaultProps = {
  data: [],
  unselectedText: translate('DROPDOWN_PLEASE_SELECT'),
  headerText: '',
  onSelect: noop
};
Dropdown.propTypes = {
  accessibilityLabel: PropTypes.string,
  data: PropTypes.array,
  unselectedText: PropTypes.string,
  headerText: PropTypes.string,
  onSelect: PropTypes.func,
  value: PropTypes.string,
  style: PropTypes.object,
  testID: PropTypes.string
};
export default Dropdown;
