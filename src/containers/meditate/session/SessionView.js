/**
 * Session Screen
 *  - Allows the user to sit through a meditation session
 *
 */
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
const styles = StyleSheet.create({});

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
    const sessionLength = this.props.user.sessionSettings.length * 60;

    clockTimer = setInterval(() => {
      if (this.state.currentTime >= sessionLength) {
        clearInterval(clockTimer);

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
      if (this.state.currentTime >= sessionLength) {
        clearInterval(soundTimer);

        return;
      }

      this.playSound(this.props.user.sessionSettings.sound);
    }, intervalTime);
  }

  playSound = (file) => {
    let soundFile = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
      soundFile.play((success) => {});
    });
  }

  render = () => {
    return (
      <View style={[AppStyles.containerCentered]}>
        <Icon name={'access-time'} size={250} color={'#ffffff'} />

        <Spacer size={50} />

        <Text h2 style={styles.timeText}>{this.state.readableCurrentTime}</Text>

        <Spacer size={50} />

        <TouchableOpacity
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
