/**
 * Custom picker
 *
    <CustomPicker
      minValue={1}
      maxValue={20}
      selectedValue={'value'}
      onValueChange={() => {}}
      type={'minutes/intervals'}
    />
 *
 */
import { Icon } from 'react-native-elements';
import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Consts and Libs
import { AppStyles } from '@theme/';

class CustomPicker extends Component {
  static propTypes = {
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    selectedValue: PropTypes.number,
    onValueChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  buildPicker = () => {
    const pickerItems = [];

    for (let time = this.props.minValue; time <= this.props.maxValue; time += 1) {
      pickerItems.push(
        <View key={time} style={[AppStyles.row]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.props.onValueChange(time)}
            hitSlop={{ top: 1, right: 10, bottom: 1, left: 10 }}
            style={AppStyles.primaryButton}
          >
            <Text style={AppStyles.modalPickerItem}>{time} {this.props.type}</Text>

            {this.props.selectedValue === time &&
              <Icon name={'done'} size={35} color={'#fe621d'} containerStyle={AppStyles.buttonIcon} />
            }
          </TouchableOpacity>
        </View>,
      );
    }

    const picker = (
      <ScrollView contentContainerStyle={AppStyles.modalScrollView}>
        {pickerItems}
      </ScrollView>

    );

    return picker;
  }

  render = () => this.buildPicker();
}

// Export Component
export default CustomPicker;
