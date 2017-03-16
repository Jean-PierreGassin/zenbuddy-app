/**
 * Custom picker
 *
    <CustomPicker
      minValue={1}
      maxValue={20}
      selectedValue={'value'}
      onValueChange={() => {}}
    />
 *
 */
import React, { PropTypes, Component } from 'react';
import { Picker } from 'react-native';

// Consts and Libs
import { AppStyles } from '@theme/';

class CustomPicker extends Component {
  static propTypes = {
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    selectedValue: PropTypes.number,
    onValueChange: PropTypes.func,
  };

  buildPicker = () => {
    const pickerItems = [];

    pickerItems.push(
      <Picker.Item
        key={'DEFAULT'}
        label={'-'}
        value={''}
      />,
    );

    for (let time = this.props.minValue; time <= this.props.maxValue; time += 1) {
      pickerItems.push(
        <Picker.Item
          key={time}
          label={`${time} minutes`}
          value={time}
        />,
      );
    }

    const picker = (
      <Picker
        itemStyle={AppStyles.modalPickerItem}
        selectedValue={this.props.selectedValue}
        onValueChange={value => this.props.onValueChange(value)}
      >
        {pickerItems}
      </Picker>
    );

    return picker;
  }

  render = () => this.buildPicker();
}

// Export Component
export default CustomPicker;
