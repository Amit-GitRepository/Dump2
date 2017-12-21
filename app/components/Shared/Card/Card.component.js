import CaretHeader from '../CaretHeader/CaretHeader.component';
import Icon from '../Icon/Icon.component';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Card.style';
import {colors, fonts} from '../../../themes/constants.styles';
import {View} from 'react-native';

class Card extends Component {
  render () {
    const {header, containerStyles, closeIcon, onClosePress, elevation, cardWrapperStyles, headerStyles} = this.props;
    const activeStyles = {...styles.header, ...headerStyles};
    return (
      <View style={[styles.mainContainer, containerStyles]} elevation={elevation}>
        {closeIcon ? <Icon style={styles.close} onPress={onClosePress} name={'cross'} /> : null}
        <CaretHeader wrapperStyles={[styles.caretHeader, cardWrapperStyles]} text={header} iconSize={fonts.FONT_SIZE_XL} active
          activeStyles={activeStyles} caretColor={colors.PRIMARY_TEXT_TAB_LABEL } caretTextType={'BOLD'}/>
        {this.props.children}
      </View>
    );
  }
}

Card.defaultProps = {
  children: [],
  header: '',
  containerStyles: {},
  closeIcon: false,
  onClosePress: noop,
  elevation: 5,
  cardWrapperStyles: {},
  headerStyles: {}
};

Card.propTypes = {
  children: PropTypes.node,
  header: PropTypes.string,
  containerStyles: PropTypes.object,
  closeIcon: PropTypes.bool,
  onClosePress: PropTypes.func,
  elevation: PropTypes.number,
  cardWrapperStyles: PropTypes.object,
  headerStyles: PropTypes.object
};

export default Card;
