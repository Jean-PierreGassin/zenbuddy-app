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

// Component
class SessionView extends Component {
  static componentName = 'SessionView';

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      modalType: 'none',
      modalVisible: false,
      sessionLengths: [],
      sessionSounds: [],
      sessionLength: 5,
      readableSessionLength: 'Set your session length',
      sessionSound: 0,
      readableSessionSound: 'Pick a mindful sound',
    };
  }

  playSound = (file) => {
    let soundFile = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
      soundFile.play((success) => {});
    });
  }

  render = () => {
    if (this.state.loading) return <Loading />;
    if (this.state.error) return <Error text={this.state.error} />;

    return (
      <View style={[AppStyles.containerCentered]}>
        <Text>Session Screen</Text>
      </View>
    );
  }
}

// Export Component
export default SessionView;
