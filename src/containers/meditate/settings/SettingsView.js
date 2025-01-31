/**
 * Settings Screen
 *
 */
import React, { Component } from 'react';
import iCloudStorage from 'react-native-icloudstore';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import {
  View,
  Modal,
  Alert,
  Picker,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Consts and Libs
import { AppStyles } from '@theme/';
import { AppInfo, AppQuotes } from '@lib/info';

// Components
import { Text, Spacer } from '@ui/';
import Loading from '@components/general/Loading';
import Error from '@components/general/Error';

// Version information
import { version } from '../../../../package.json';

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

  static propTypes = {
    updateMe: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      modalType: 'none',
      modalVisible: false,
      helpModalVisible: false,
      helpModalText: '',
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
          const schedule = userData.sessionSettings.schedule;

          if (schedule.time === 0) {
            schedule.time = 'Reminder time: none';
          }

          let newDayList = [];
          const newDayListObjects = [];

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

  getScheduleTimes = () => {
    const times = this.generateTimes(15);
    const timesJsx = [];

    timesJsx.push(
      <Picker.Item
        key={'DEFAULT'}
        label={'None'}
        value={'Reminder time: none'}
      />,
    );

    times.forEach((time, index) => {
      timesJsx.push(
        <Picker.Item
          key={index}
          label={time}
          value={time}
        />,
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

  getScheduleDays = () => {
    const dayIndexes = [];

    this.state.scheduleDays.forEach((day) => {
      dayIndexes.push(day.index);
    });

    return (
      <ScrollView contentContainerStyle={AppStyles.modalScrollView}>
        {daysList.map(day => (
          <View key={day.index} style={[AppStyles.row]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.setScheduleDays(day)}
              hitSlop={{ top: 1, right: 10, bottom: 1, left: 10 }}
              style={AppStyles.primaryButton}
            >
              <Text>{day.name}</Text>

              {dayIndexes.indexOf(day.index) > -1 &&
                <Icon name={'done'} size={35} color={'#fe621d'} containerStyle={AppStyles.buttonIcon} />
              }
            </TouchableOpacity>
          </View>
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
      const firstIndex = a.index;
      const secondIndex = b.index;

      return firstIndex > secondIndex;
    });

    scheduleDays.forEach((dayObject) => {
      readableScheduleDays.push(dayObject.friendlyName);
    });

    return this.setState({
      scheduleDays,
      readableScheduleDays: readableScheduleDays.join(', '),
    });
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

  toggleModal = (type) => {
    this.setState({
      modalType: type,
      modalVisible: !this.state.modalVisible,
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

  showHelpModal = () => {
    this.setState({
      helpModalText: AppInfo.scheduleHelpText,
      helpModalVisible: true,
    });
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
      <ScrollView
        style={[{ overflow: 'visible' }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          AppStyles.container,
        ]}
      >
        <Spacer size={30} />

        <View style={[AppStyles.row]}>
          <View style={[AppStyles.flex1]} />

          <View style={[AppStyles.flex10]}>
            <Text h3>Zen Schedule</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={{ top: 10, right: 10, bottom: 5, left: 10 }}
              onPress={() => this.showHelpModal()}
              style={AppStyles.headerHelpButtonIcon}
            >
              <Icon name={'help'} size={25} color={'#fff'} />
            </TouchableOpacity>
          </View>

          <View style={[AppStyles.flex1]} />
        </View>

        <View style={[AppStyles.row]}>
          <View style={[AppStyles.flex1]} />

          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{ top: 5, right: 10, bottom: 5, left: 10 }}
            onPress={() => this.toggleModal('sessionScheduleDays')}
            style={AppStyles.primaryButton}
          >
            <Text>{this.state.readableScheduleDays}</Text>
          </TouchableOpacity>

          <View style={[AppStyles.flex1]} />
        </View>

        {/*
        <TouchableOpacity
        activeOpacity={0.7}
        hitSlop={{ top: 10, right: 10, bottom: 5, left: 10 }}
        onPress={() => this.toggleModal('sessionScheduleTime')}
        style={AppStyles.primaryButton}>
          <Text>{this.state.scheduleTime}</Text>
        </TouchableOpacity>
        */}

        <Modal
          transparent
          animationType={'slide'}
          visible={this.state.modalVisible}
          supportedOrientations={['portrait', 'landscape']}
          onRequestClose={() => this.setState({ helpModalVisible: false })}
        >
          <View style={AppStyles.modalContainer}>
            <TouchableOpacity
              style={AppStyles.modalCloseButton}
              onPress={() => this.setState({ modalVisible: false })}
            >
              <Text h4>Close</Text>
            </TouchableOpacity>

            {modalContents}
          </View>
        </Modal>

        <Modal
          transparent
          animationType={'fade'}
          visible={this.state.helpModalVisible}
          supportedOrientations={['portrait', 'landscape']}
          onRequestClose={() => this.setState({ helpModalVisible: false })}
        >
          <TouchableOpacity
            style={AppStyles.helpModalContainer}
            activeOpacity={1}
            onPress={() => this.setState({ helpModalVisible: false })}
          >
            <View style={[AppStyles.flex5]} />

            <Text>{this.state.helpModalText}</Text>

            <View style={[AppStyles.flex5]} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              AppStyles.helpModalCloseButton,
              AppStyles.noRadiusTop,
            ]}
            onPress={() => this.setState({ helpModalVisible: false })}
          >
            <Text>Got it!</Text>
          </TouchableOpacity>
        </Modal>

        <Spacer size={50} />

        <View style={[AppStyles.row]}>
          <View style={[AppStyles.flex1]} />

          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            onPress={() => this.saveSettings()}
            style={AppStyles.primaryButton}
          >
            <Text>Save</Text>
          </TouchableOpacity>

          <View style={[AppStyles.flex1]} />
        </View>

        <Spacer size={50} />

        <View style={[AppStyles.center]}>
          <Text h6>ZenBuddy v{version}</Text>
          <Text h6>Created by Jean-Pierre Gassin</Text>
        </View>

        <Spacer size={30} />
      </ScrollView>
    );
  }
}

// Export Component
export default SettingsView;
