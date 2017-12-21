import Icon from '../Icon/Icon.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './List.styles.js';
import Touchable from '../Touchable/Touchable.component.js';
import {FlatList, View} from 'react-native';
import {ISText} from '../../Shared';
import * as Animatable from 'react-native-animatable';

class List extends Component {

  _listItem = ({item, index}) => { // index, separators are also passed. Item can be a string or an object
    const {onPress, headingKey, subHeadingKey, alignListItemsCenter, arrowVisibility} = this.props;
    const isClickable = !!onPress;
    const WrapperView = isClickable ? Touchable : View;
    const listItemWrapperStyle = alignListItemsCenter ? [styles.listItemWrapper, styles.justifyContentCenter] : styles.listItemWrapper;
    const headingStyles = alignListItemsCenter ?  [styles.heading, styles.textAlignCenter] : styles.heading;
    const subHeadingStyles = alignListItemsCenter ? [styles.subHeading, styles.textAlignCenter] : styles.subHeading;
    const wrapperStyle = index % 2 !== 0 ? [listItemWrapperStyle, styles.darkBackground] : // index % 2 is for alternating colors in the list
      [listItemWrapperStyle, styles.lightBackground];
    const heading = typeof item === 'string' ? item : result(item, headingKey);
    const subHeading = result(item, subHeadingKey);
    return (
      <WrapperView id={index} onPress={onPress ? onPress(item) : null}>
        <Animatable.View key={index} style={wrapperStyle} animation='fadeIn' duration={500}>
          <View style={(isClickable && arrowVisibility) ? styles.contentWrapper : {}}>
            {heading ? <ISText style={headingStyles} type={'SEMIBOLD'}>{heading}</ISText> : null}
            {subHeading ? <ISText style={subHeadingStyles} type={'SEMIBOLD'}>{subHeading}</ISText> : null}
          </View>
          {(isClickable && arrowVisibility) ?  <Icon name={'chevron-right'} style={styles.arrowStyle}/> : null }
        </Animatable.View>
      </WrapperView>
    );
  }

  _keyExtractor = (item, index) => index;

  render () {
    const {data} = this.props;
    return (
      <FlatList data={data} renderItem={this._listItem} keyExtractor={this._keyExtractor} />
    );
  }
}
List.defaultProps = {
  data: [],
  headingKey: 'heading',
  subHeadingKey: 'subHeading',
  alignListItemsCenter: false,
  arrowVisibility: true
};
List.propTypes = {
  onPress: PropTypes.func,
  data: PropTypes.array,
  headingKey: PropTypes.string,
  subHeadingKey: PropTypes.string,
  alignListItemsCenter: PropTypes.bool,
  arrowVisibility: PropTypes.bool
};
export default List;
