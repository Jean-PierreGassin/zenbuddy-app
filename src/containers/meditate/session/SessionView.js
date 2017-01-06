/**
 * Session Screen
 *  - Allows the user to sit through a meditation session
 *
 */
import moment from 'moment';
import iCloudStorage from 'react-native-icloudstore';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  InteractionManager,
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

var clockTimer;
var soundTimer;

// Component
class SessionView extends Component {
  static componentName = 'SessionView';

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
  }

  componentWillUnmount = () => {
    clearInterval(clockTimer);
    clearInterval(soundTimer);
  }

  startTimer = () => {
    // const sessionLength = this.props.user.sessionSettings.length * 60;
    const sessionLength = 1;

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
    const intervalTime = sessionLength * 1000 / this.props.user.sessionSettings.intervals;

    soundTimer = setInterval(() => {
      this.playSound(this.props.user.sessionSettings.sound);
    }, intervalTime);
  }

  playSound = (file) => {
    let soundFile = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
      soundFile.play((success) => {});
    });
  }

  finishSession = () => {
    this.playSound('finish.mp3');
    this.saveHistory();

    this.setState({
      isFinished: true,
      readableCurrentTime: `Well done, you've completed your ${this.props.user.sessionSettings.length} minute session!`,
    });

    setTimeout(() => {
      Actions.pop();
    }, 3000);
  }

  saveHistory = () => {
    iCloudStorage.getItem('user').then((response) => {
      let sessionStreak = 1;
      let userData = JSON.parse(response);
      let currentDate = moment().format();

      if (!userData.sessionHistory) {
        userData.sessionHistory = [];
      }

      if (userData.sessionHistory) {
        let historyLength = userData.sessionHistory.length - 1;

        for (let session = historyLength; session > -1; session--) {
          let previousSession = userData.sessionHistory[session];

          if (moment(currentDate).subtract(sessionStreak, 'days').isSame(moment(previousSession.date), 'day')) {
            sessionStreak += 1;
          } else {
            break;
          }
        }
      }

      userData.sessionHistory.push({
        date: currentDate,
        length: this.props.user.sessionSettings.length,
        intervals: this.props.user.sessionSettings.intervals,
      });

      this.props.updateMe({
        sessionStreak,
        ...userData,
      });
    });
  }

  render = () => {
    return (
      <View style={AppStyles.containerCentered}>
        <Icon name={'access-time'} size={250} color={'#ffffff'} />

        <Spacer size={50} />

        <Text h2 style={[styles.clockText]}>{this.state.readableCurrentTime}</Text>

        <Spacer size={50} />

        <TouchableOpacity
          disabled={this.state.isFinished}
          activeOpacity={0.7}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          onPress={() => Actions.pop()}
          style={AppStyles.primaryButton}>
          <Text>I'm finished</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// Export Component
export default SessionView;
