/**
 * Settings Screen
 *
 */
import iCloudStorage from 'react-native-icloudstore';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import React, { Component, PropTypes } from 'react';
import {
  View,
  Modal,
  Alert,
  Picker,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';

// Components
import { Text, Spacer } from '@ui/';
import Loading from '@components/general/Loading';
import Error from '@components/general/Error';

// Styles
const styles = StyleSheet.create({
  tickIcon: {
    position: 'absolute',
    right: 4,
    top: 4,
  },
});

const daysList = [
  { name: 'None', index: '0', friendlyName: 'Days: none' },
  { name: 'Monday', index: '1', friendlyName: 'Mon' },
  { name: 'Tuesday', index: '2', friendlyName: 'Tue' },
  { name: 'Wednesday', index: '3', friendlyName: 'Wed' },
  { name: 'Thursday', index: '4', friendlyName: 'Thur' },
  { name: 'Friday', index: '5', friendlyName: 'Fri' },
  { name: 'Saturday', index: '6', friendlyName: 'Sat' },
  { name: 'Sunday', index: '7', friendlyName: 'Sun' },
];

// Component
class SettingsView extends Component {
  static componentName = 'SettingsView';

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      modalType: 'none',
      modalVisible: false,
      scheduleDays: [],
      scheduleTime: 'Reminder time: none',
      readableScheduleDays: 'Days: none',
    };
  }
  
  componentWillMount = () => {
    iCloudStorage.getItem('user').then((response) => {
      if (response) {
        const userData = JSON.parse(response);

        if (userData.sessionSettings && userData.sessionSettings.schedule) {
          let schedule = userData.sessionSettings.schedule;
          
          if (schedule.time === 0) {
            schedule.time = 'Reminder time: none';
          }
          
          let newDayList = [];
          let newDayListObjects = [];
          
          if (schedule.days.length > 0) {
            daysList.forEach((day) => {
              if (schedule.days.indexOf(Number(day.index)) > -1) {
                newDayList.push(day.friendlyName);
                newDayListObjects.push(day);
              }
            });
            
            newDayList = newDayList.join(', ');
          }
          
          if (newDayList.length === 0) {
            newDayList = 'Days: none';
          }
          
          this.setState({
            scheduleDays: newDayListObjects,
            readableScheduleDays: newDayList,
            scheduleTime: schedule.time,
          });
        }
      }
    });
  }
  
  toggleModal = (type) => {
    this.setState({
      modalType: type,
      modalVisible: !this.state.modalVisible,
    });
  }
  
  getScheduleTimes = () => {
    const times = this.generateTimes(15);
    const timesJsx = [];

    timesJsx.push(
      <Picker.Item
        key={'DEFAULT'}
        label={'None'}
        value={'Reminder time: none'}
      />
    );

    times.forEach((time, index) => {
      timesJsx.push(
        <Picker.Item
          key={index}
          label={time}
          value={time}
        />
      );
    });

    const picker = (
      <Picker
        itemStyle={AppStyles.modalPickerItem}
        selectedValue={this.state.scheduleTime}
        onValueChange={scheduleTime => this.setState({ scheduleTime })}
      >
        {timesJsx}
      </Picker>
    );

    return picker;
  }
  
  generateTimes = (increments) => {
    const times = [];
    const date = new Date(1970, 0, 1, 0, 0, 0, 0);

    while (date.getDate() === 1) {
      const point = date.toLocaleTimeString('en-US');

      date.setMinutes(date.getMinutes() + increments);
      times.push(point);
    }
    
    return times;
  }
  
  getScheduleDays = () => {
    const dayIndexes = [];
    
    this.state.scheduleDays.forEach((day) => {
      dayIndexes.push(day.index);
    });
    
    return (
      <ScrollView contentContainerStyle={AppStyles.modalScrollView}>
        {daysList.map(day => (
          <TouchableOpacity
            key={day.index}
            activeOpacity={0.7}
            onPress={() => this.setScheduleDays(day)}
            hitSlop={{ top: 1, right: 10, bottom: 1, left: 10 }}
            style={AppStyles.primaryButton}
          >
            <Text>{day.name}</Text>

            {dayIndexes.indexOf(day.index) > -1 &&
              <Icon name={'done'} size={35} color={'#fe621d'} containerStyle={styles.tickIcon} />
            }
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  setScheduleDays = (day) => {
    const readableScheduleDays = [];
    let scheduleDays = this.state.scheduleDays;
    let wasRemoved = false;
    
    if (day.name === 'None') {
      scheduleDays = [];
      
      return this.setState({
        scheduleDays,
        readableScheduleDays: 'Days: none',
      });
    }

    scheduleDays.forEach((storedDay, index) => {
      if (storedDay.name === day.name) {
        scheduleDays.splice(index, 1);

        wasRemoved = true;
      }
    });

    if (!wasRemoved) {
      scheduleDays.push(day);
    }

    if (scheduleDays.length === 0) {
      return this.setState({
        scheduleDays,
        readableScheduleDays: 'Days: none',
      });
    }

    scheduleDays.sort((a, b) => {
      return a.index > b.index;
    });

    scheduleDays.forEach((dayObject) => {
      readableScheduleDays.push(dayObject.friendlyName);
    });

    return this.setState({
      scheduleDays,
      readableScheduleDays: readableScheduleDays.join(', '),
    });
  }

  saveSettings = () => {
    const scheduleDays = this.state.scheduleDays;

    if (scheduleDays.length === 1) {
      Alert.alert('ZenBuddy', 'Please select more than\rone day to schedule');

      return;
    }

    iCloudStorage.getItem('user').then((response) => {
      let userData = {};

      if (response) {
        userData = JSON.parse(response);
      }

      if (!userData.sessionSettings) {
        userData.sessionSettings = {};
      }

      if (!userData.sessionSettings.schedule) {
        userData.sessionSettings.schedule = {};
      }

      const newScheduleDays = [];

      this.state.scheduleDays.forEach((day) => {
        newScheduleDays.push(Number(day.index));
      });
      
      let newScheduleTime = this.state.scheduleTime;

      if (newScheduleTime === 'Reminder time: none') {
        newScheduleTime = 0;
      }

      userData.sessionSettings.schedule.days = newScheduleDays;
      userData.sessionSettings.schedule.time = newScheduleTime;

      this.props.updateMe({
        ...userData,
      });
    });

    Actions.pop();
  }

  render = () => {
    if (this.state.loading) return <Loading />;
    if (this.state.error) return <Error text={this.state.error} />;
    
    let modalContents;

    if (this.state.modalType === 'sessionScheduleDays') {
      modalContents = this.getScheduleDays();
    }

    if (this.state.modalType === 'sessionScheduleTime') {
      modalContents = this.getScheduleTimes();
    }

    return (
      <View style={AppStyles.containerCentered}>
        <ScrollView>
          <Spacer size={20} />
          
          <Text h3>Zen Schedule</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{ top: 10, right: 10, bottom: 5, left: 10 }}
            onPress={() => this.toggleModal('sessionScheduleDays')}
            style={AppStyles.primaryButton}>
            <Text>{this.state.readableScheduleDays}</Text>
          </TouchableOpacity>
          
          {/*<TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{ top: 10, right: 10, bottom: 5, left: 10 }}
            onPress={() => this.toggleModal('sessionScheduleTime')}
            style={AppStyles.primaryButton}>
            <Text>{this.state.scheduleTime}</Text>
          </TouchableOpacity>*/}
        </ScrollView>
        
        <Modal
          transparent
          animationType={"slide"}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}>
          <View style={AppStyles.modalContainer}>
            <TouchableOpacity
              style={AppStyles.modalCloseButton}
              onPress={() => this.setState({modalVisible: false})}>
              <Text h4>Close</Text>
            </TouchableOpacity>

            {modalContents}
          </View>
        </Modal>
        
        <Spacer size={50} />

        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          onPress={() => this.saveSettings()}
          style={AppStyles.primaryButton}>
          <Text>Save</Text>
        </TouchableOpacity>
        
        <Spacer size={50} />
        
        <Text h6>ZenBuddy v1.0.0</Text>
        <Text h6>Created by Jean-Pierre Gassin</Text>
      </View>
    );
  }
}

// Export Component
export default SettingsView;
