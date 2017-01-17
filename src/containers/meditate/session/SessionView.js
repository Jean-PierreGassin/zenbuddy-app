/**
 * Session Screen
 *  - Allows the user to sit through a meditation session
 *
 */
import moment from 'moment';
import KeepAwake from 'react-native-keep-awake';
import iCloudStorage from 'react-native-icloudstore';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import React, { Component, PropTypes } from 'react';
import {
  View,
  Alert,
  StyleSheet,
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
  clockText: {
    ...AppStyles.h2,
    textAlign: 'center',
  },
});

const timeOuts = [];
let clockTimer;
let soundTimer;

// Component
class SessionView extends Component {
  static componentName = 'SessionView';

  static propTypes = {
    user: React.PropTypes.shape({
      sessionSettings: React.PropTypes.shape({
        length: React.PropTypes.number.isRequired,
        sound: React.PropTypes.string.isRequired,
        intervals: React.PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    updateMe: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
      readableCurrentTime: '00:00:00',
      isFinished: false,
    };
  }

  componentWillMount = () => {
    this.startTimer();
    this.startSound();

    KeepAwake.activate();
  }

  componentWillUnmount = () => {
    clearInterval(clockTimer);
    clearInterval(soundTimer);

    // Clear all of our interval sounds
    for (let i = 0; i < timeOuts.length; i += 1) {
      clearTimeout(timeOuts[i]);
    }

    KeepAwake.deactivate();
  }

  startTimer = () => {
    const sessionLength = this.props.user.sessionSettings.length * 60;
    // const sessionLength = 1;

    clockTimer = setInterval(() => {
      if (this.state.currentTime >= sessionLength) {
        clearInterval(clockTimer);
        clearInterval(soundTimer);

        this.finishSession();

        return;
      }

      const currentTime = this.state.currentTime + 1;
      const readableCurrentTime = new Date(1000 * currentTime).toISOString().substr(11, 8);

      this.setState({
        currentTime,
        readableCurrentTime,
      });
    }, 1000);
  }

  startSound = () => {
    const sessionLength = this.props.user.sessionSettings.length * 60;
    const intervalTime = sessionLength / (this.props.user.sessionSettings.intervals + 1);

    // Setup a list of timeouts that will play at the appropriate times
    for (let i = 1; i <= this.props.user.sessionSettings.intervals; i += 1) {
      timeOuts.push(
        setTimeout(() => {
          this.playSound(this.props.user.sessionSettings.sound);
        }, (intervalTime * i) * 1000),
      );
    }
  }

  playSound = (file, extra = {}) => {
    const soundFile = new Sound(file, Sound.MAIN_BUNDLE, () => {
      soundFile.play(() => {});

      // Allows for sounds to be faded in
      if (extra && extra.beQuiet) {
        soundFile.setVolume(0.1);

        setTimeout(() => {
          soundFile.setVolume(1);
        }, 850);
      }
    });
  }

  finishSession = () => {
    this.playSound('finish.mp3', { beQuiet: true });
    this.saveHistory();

    this.setState({
      isFinished: true,
      readableCurrentTime: `Well done, you've completed your ${this.props.user.sessionSettings.length} minute session!`,
    });
  }

  saveHistory = () => {
    iCloudStorage.getItem('user').then((response) => {
      const userData = JSON.parse(response);

      if (!userData.sessionHistory) {
        userData.sessionHistory = [];
      }

      const streak = this.calculateStreak(userData);

      userData.sessionHistory.unshift({
        date: moment().format(),
        length: this.props.user.sessionSettings.length,
        intervals: this.props.user.sessionSettings.intervals,
      });

      this.props.updateMe({
        ...userData,
        sessionStreak: streak,
      });

      setTimeout(() => {
        Actions.pop();
        Actions.personal();
      }, 3000);
    });
  }

  calculateStreak = (userData) => {
    let currentStreak = userData.sessionStreak;

    if (userData.sessionHistory.length === 0) return 1;
    if (!currentStreak) currentStreak = 1;

    const currentDate = moment().format();
    const lastSession = userData.sessionHistory[0];
    const sessionSchedule = userData.sessionSettings.schedule;

    // Do not increase streak if we already increased it today
    if (moment(currentDate).isSame(moment(lastSession.date), 'day')) {
      return currentStreak;
    }

    // Reset streak if no sessions for more than a week
    if (moment(lastSession.date).diff(currentDate, 'days') > 7) {
      currentStreak = 1;

      return currentStreak;
    }

    // Session continued from the day before
    if (moment(currentDate).diff(lastSession.date, 'days') === 1) {
      currentStreak += 1;

      return currentStreak;
    }

    // Check if user is adhering to schedule instead
    if (sessionSchedule && sessionSchedule.days) {
      const currentDay = moment(currentDate).isoWeekday();
      const previousDay = moment(lastSession.date).isoWeekday();
      const currentDayIndex = sessionSchedule.days.indexOf(currentDay);
      let previousScheduledSession = sessionSchedule.days[currentDayIndex - 1];

      if (currentDayIndex === sessionSchedule.days.length - 1) {
        previousScheduledSession = sessionSchedule.days[0];
      }

      if (currentDayIndex === 0) {
        previousScheduledSession = sessionSchedule.days[sessionSchedule.days.length - 1];
      }

      if (previousScheduledSession === previousDay) {
        currentStreak += 1;

        return currentStreak;
      }
    }

    // Check if we have missed a day
    if (moment(currentDate).diff(lastSession.date, 'days') !== 1) {
      currentStreak = 1;
    }

    return currentStreak;
  }

  manualFinish = () => {
    Alert.alert(
      'Are you sure?',
      'Manually finishing a session won\'t save it to your history!',
      [
        { text: 'Cancel Session', onPress: () => Actions.pop() },
        { text: 'Continue Session', onPress: () => {}, style: 'cancel' },
      ],
    );
  }

  render = () => (
    <View style={AppStyles.containerCentered}>
      <Icon name={'access-time'} size={250} color={'#ffffff'} />

      <Spacer size={50} />

      <Text h2 style={[styles.clockText]}>{this.state.readableCurrentTime}</Text>

      <Spacer size={50} />

      <TouchableOpacity
        disabled={this.state.isFinished}
        activeOpacity={0.7}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        onPress={() => this.manualFinish()}
        style={AppStyles.primaryButton}
      >
        <Text>I am finished</Text>
      </TouchableOpacity>
    </View>
  );
}

// Export Component
export default SessionView;
