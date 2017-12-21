import map from 'lodash/map';
import noop from 'lodash/noop';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './RadioGroup.style';
import TopUpRadioButton from '../TopUpRadioButton/TopUpRadioButton.component';
import {translate} from '../../../language/i18n/helper';
import {View} from 'react-native';

class RadioGroup extends Component {
  state = {
    selected: ''
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.showDefaultValue && !this.state.selected && this.props.showDefaultValue !== nextProps.showDefaultValue) {
      this.radioSelect(this.props.radioGroupData[0].value);
    }
  }

  radioSelect = (value) => {
    this.setState({selected: value});
    this.props.onChange(value);
  }

  calculateRadioView (radioGroupData) {
    const {selected} = this.state;
    const {radioButtonStyle} = this.props;
    const radioArray = [];
    let i, j, tempArray;
    const chunk = 4;
    for (i = 0, j = radioGroupData.length; i < j; i += chunk) {
      // Split radio data into groups of size of chunk
      tempArray = radioGroupData.slice(i, i + chunk);
      const radioGroup = map(tempArray, (radiocomp, index) =>
        <TopUpRadioButton style={radioButtonStyle} key={index} label={result(radiocomp, 'label', '') || translate('BILLS_USAGE_MORE')}
          value={result(radiocomp, 'value', '')} index={index}
          radioSelect={this.radioSelect} active={selected === result(radiocomp, 'value', '')}/>);
      radioArray.push(radioGroup);
    }
    // Each group becomes a row
    const radioView = map(radioArray, (radioRow, index) =>
      <View key={index} style={styles.radioRow}>
        {radioRow}
      </View>);
    return radioView;
  }

  render () {
    const {radioGroupData, style} = this.props;
    const radioView = this.calculateRadioView(radioGroupData);
    return (
      <View style={[styles.container, style]}>
        {radioView}
      </View>);
  }
}
RadioGroup.defaultProps = {
  radioGroupData: [], // [{label: '', value: ''}]
  onChange: noop, // callBack with the selected radio button value,
  showDefaultValue: false, // VALUE of option to be intially selected
  style: {},
  radioButtonStyle: {}
};
RadioGroup.propTypes = {
  radioGroupData: Proptypes.array,
  onChange: Proptypes.func,
  showDefaultValue: Proptypes.bool,
  style: Proptypes.object,
  radioButtonStyle: Proptypes.object
};
export default RadioGroup;
