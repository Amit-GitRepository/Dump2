import BottomCaretView from '../BottomCaretView/BottomCaretView.component';
import DeselectedTabView from '../DeselectedTabView/DeselectedTabView.component';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles, {caretSize} from './CaretTabs.style.js';
import Touchable from '../Touchable/Touchable.component';
import {ISText} from '../../Shared';
import {shadowActiveStyle} from '../../../themes/application.styles';
import {View} from 'react-native';

class CaretTabs extends Component {

  onPress = (index) => () => this.props.onTabPress(index);

  render () {
    const {accessibilityLabel, activeTabStyle, inActiveTabStyle, headerList, selectedIndex, children, bodyStyle, headerContainerStyle, disableShadow, testID} = this.props;
    const customActiveStyle = {...styles.activeTab, ...activeTabStyle};
    return (
      <View style={styles.container} accessibilityLabel={accessibilityLabel} testID={testID}>
        <View style={[styles.headerContainer, headerContainerStyle]}>
          {
            headerList.map((header, index) => {
              const {text} = header;
              const isActive = (selectedIndex === index);
              const isLast = (index === headerList.length - 1);
              const Wrapper = isActive ? BottomCaretView : DeselectedTabView;
              const tabStyle = isActive ? {...styles.wrapper, ...customActiveStyle} : {...styles.inactiveTab, ...inActiveTabStyle};
              const tabTextStyle = isActive ? styles.activeText : styles.inactiveText;
              const touchWrapperStyle = isLast ? [styles.touchWrapper, styles.lastWrapper] : styles.touchWrapper;
              return (
                <Touchable borderless={true} style={touchWrapperStyle} onPress={this.onPress(index)} key={index}>
                  <Wrapper style={tabStyle} iconSize={caretSize} caretColor={tabStyle.backgroundColor}>
                    <ISText type='BOLD' style={tabTextStyle} numberOfLines={1}>{text}</ISText>
                  </Wrapper>
                </Touchable>
              );
            })
          }
        </View>
        <View style={[styles.separator, {borderColor: customActiveStyle.backgroundColor}]} />
        { disableShadow ?
          <View style={[styles.body, bodyStyle]}>{children}</View> :
          <View style={[styles.body, bodyStyle, shadowActiveStyle]}>{children}</View> }
      </View>
    );
  }
}

CaretTabs.defaultProps = {
  headerList: [{
    text: 'Primary'
  }, {
    text: 'Secondary'
  }],
  onTabPress: noop,
  selectedIndex: 0,
  children: null,
  bodyStyle: {},
  activeTabStyle: {},
  inActiveTabStyle: {},
  headerContainerStyle: {},
  disableShadow: false
};
CaretTabs.propTypes = {
  accessibilityLabel: PropTypes.string,
  activeTabStyle: PropTypes.object,
  inActiveTabStyle: PropTypes.object,
  headerList: PropTypes.array,
  onTabPress: PropTypes.func,
  selectedIndex: PropTypes.number,
  children: PropTypes.node,
  bodyStyle: PropTypes.object,
  headerContainerStyle: PropTypes.object,
  disableShadow: PropTypes.bool,
  testID: PropTypes.string
};
export default CaretTabs;
