/**
 * Setup Screen
 *  - Allows the user to sit through a meditation session
 *
 */
/* global fetch */

import iCloudStorage from 'react-native-icloudstore';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';
import {
  View,
  Modal,
  Picker,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// Consts and Libs
import { AppStyles } from '@theme/';
import { AppInfo, AppQuotes } from '@lib/info';

// Components
import { Text, Spacer } from '@ui/';

// Component
class SetupView extends Component {
  static componentName = 'SetupView';

  static propTypes = {
    updateMe: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      quoteLoading: true,
      modalType: 'none',
      modalVisible: false,
      helpModalVisible: false,
      readableSessionLength: 'Set your session length',
      readableSessionSound: 'Pick a mindful sound',
      readableSessionInterval: 'Choose your mindful intervals',
    };
  }

  componentDidMount = () => {
    this.getQuote();
  }

  getQuote = () => {
    fetch('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en', {
      method: 'POST',
    }).then(response => response.json()).then((data) => {
      this.setState({
        quoteLoading: false,
        quoteAuthor: data.quoteAuthor,
        quoteBody: data.quoteText,
      });
    }).catch(() => {
      this.setState({
        quoteLoading: false,
        quoteAuthor: AppQuotes.defaultAuthor,
        quoteBody: AppQuotes.defaultContent,
      });
    });
  }

  getSessionLengths = () => {
    const sessionLengths = [];

    sessionLengths.push(
      <Picker.Item
        key={'DEFAULT'}
        label={'-'}
        value={''}
      />,
    );

    for (let time = 5; time <= 120; time += 1) {
      sessionLengths.push(
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
        selectedValue={this.state.sessionLength}
        onValueChange={(length) => {
          if (length) {
            this.setState({
              sessionLength: length,
              readableSessionLength: `Your session will be ${length} minutes long`,
            });
          }
        }}
      >
        {sessionLengths}
      </Picker>
    );

    return picker;
  }

  getSessionSounds = () => {
    const sounds = [
      { name: 'Bellow', file: 'bellow.wav' },
      { name: 'Birds', file: 'birds.wav' },
      { name: 'Bleep', file: 'bleep.wav' },
      { name: 'Twinkle', file: 'twinkle.mp3' },
      { name: 'Chimes', file: 'chimes.mp3' },
      { name: 'Water Drop', file: 'water-drop.wav' },
    ];

    return (
      <ScrollView contentContainerStyle={[AppStyles.modalScrollView]}>
        {sounds.map(sound => (
          <View key={`SOUND-${sound.name}`} style={[AppStyles.row]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.playSound(sound.file);

                this.setState({
                  sessionSound: sound.file,
                  readableSessionSound: `You'll be listening to ${sound.name}`,
                });
              }}
              hitSlop={{ top: 1, right: 10, bottom: 1, left: 10 }}
              style={AppStyles.primaryButton}
            >
              <Text>{sound.name}</Text>

              {this.state.sessionSound === sound.file &&
                <Icon name={'done'} size={35} color={'#fe621d'} containerStyle={AppStyles.buttonIcon} />
              }

              {this.state.sessionSound !== sound.file &&
                <Icon name={'play-circle-filled'} size={35} color={'#fe621d'} containerStyle={AppStyles.buttonIcon} />
              }
            </TouchableOpacity>
          </View>

        ))}
      </ScrollView>
    );
  }

  getSessionIntervals = () => {
    const sessionIntervals = [];

    sessionIntervals.push(
      <Picker.Item
        key={'DEFAULT'}
        label={'-'}
        value={''}
      />,
    );

    for (let intervals = 3; intervals <= 12; intervals += 1) {
      sessionIntervals.push(
        <Picker.Item
          key={intervals}
          label={`${intervals} intervals`}
          value={intervals}
        />,
      );
    }

    const picker = (
      <Picker
        itemStyle={AppStyles.modalPickerItem}
        selectedValue={this.state.sessionInterval}
        onValueChange={(interval) => {
          if (interval) {
            this.setState({
              sessionInterval: interval,
              readableSessionInterval: `${interval} times during your session`,
            });
          }
        }}
      >
        {sessionIntervals}
      </Picker>
    );

    return picker;
  }

  toggleModal = (type) => {
    this.setState({
      modalType: type,
      modalVisible: !this.state.modalVisible,
    });
  }

  playSound = (file) => {
    const soundFile = new Sound(file, Sound.MAIN_BUNDLE, () => {
      soundFile.play(() => {});
    });
  }

  startSession = () => {
    iCloudStorage.getItem('user').then((response) => {
      let userData = {};

      if (response) {
        userData = JSON.parse(response);
      }

      if (!userData.sessionSettings) {
        userData.sessionSettings = {};
      }

      userData.sessionSettings = {
        ...userData.sessionSettings,
        sound: this.state.sessionSound,
        length: this.state.sessionLength,
        intervals: this.state.sessionInterval,
      };

      this.props.updateMe({
        ...userData,
      });

      Actions.session();
    });
  }

  showHelpModal = () => {
    this.setState({
      helpModalText: AppInfo.intervalHelpText,
      helpModalVisible: true,
    });
  }

  render = () => {
    let modalContents;
    const buttonDisabled = (!this.state.sessionLength ||
      !this.state.sessionSound || !this.state.sessionInterval);

    if (this.state.modalType === 'sessionLengths') {
      modalContents = this.getSessionLengths();
    }

    if (this.state.modalType === 'sessionSounds') {
      modalContents = this.getSessionSounds();
    }

    if (this.state.modalType === 'sessionIntervals') {
      modalContents = this.getSessionIntervals();
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          AppStyles.container,
          AppStyles.center,
        ]}
      >
        <Spacer size={30} />

        <View style={[AppStyles.row]}>
          <View style={[AppStyles.flex1]} />

          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{ top: 10, right: 10, bottom: 5, left: 10 }}
            onPress={() => this.toggleModal('sessionLengths')}
            style={AppStyles.primaryButton}
          >
            <Text>{this.state.readableSessionLength}</Text>
          </TouchableOpacity>

          <View style={[AppStyles.flex1]} />
        </View>

        <Spacer size={10} />

        <View style={[AppStyles.row]}>
          <View style={[AppStyles.flex1]} />

          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{ top: 5, right: 10, bottom: 10, left: 10 }}
            onPress={() => this.toggleModal('sessionSounds')}
            style={AppStyles.primaryButton}
          >
            <Text>{this.state.readableSessionSound}</Text>
          </TouchableOpacity>

          <View style={[AppStyles.flex1]} />
        </View>

        <Spacer size={10} />

        <View style={[AppStyles.row]}>
          <View style={[AppStyles.flex1]} />

          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{ top: 5, right: 10, bottom: 10, left: 10 }}
            onPress={() => this.toggleModal('sessionIntervals')}
            style={AppStyles.primaryButton}
          >
            <Text>{this.state.readableSessionInterval}</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              onPress={() => this.showHelpModal()}
              style={AppStyles.buttonIcon}
            >
              <Icon name={'help'} size={35} color={'#fe621d'} />
            </TouchableOpacity>
          </TouchableOpacity>

          <View style={[AppStyles.flex1]} />
        </View>

        <Spacer size={50} />

        <View style={[AppStyles.row]}>
          <View style={[AppStyles.flex1]} />

          <TouchableOpacity
            disabled={buttonDisabled}
            activeOpacity={0.7}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            onPress={() => this.startSession()}
            style={[AppStyles.primaryButton, buttonDisabled && AppStyles.primaryButtonDisabled]}
          >
            <Text>Begin your session</Text>
            <Icon name={'play-circle-filled'} size={35} color={'#fe621d'} containerStyle={AppStyles.buttonIcon} />
          </TouchableOpacity>

          <View style={[AppStyles.flex1]} />
        </View>

        <Spacer size={50} />

        <View style={[AppStyles.row]}>
          <View style={[AppStyles.flex1]} />

          {this.state.quoteLoading &&
            <View style={[AppStyles.flex10, AppStyles.centerAligned]}>
              <ActivityIndicator
                animating
                size={'small'}
                color={'#FFFFFF'}
              />
            </View>
          }

          {!this.state.quoteLoading &&
            <View style={[AppStyles.flex10, AppStyles.center]}>
              <Text h4 style={AppStyles.textCenterAligned}>{this.state.quoteAuthor}</Text>
              <Text style={AppStyles.textCenterAligned}>{this.state.quoteBody}</Text>
            </View>
          }

          <View style={[AppStyles.flex1]} />
        </View>

        <Modal
          transparent
          animationType={'slide'}
          visible={this.state.modalVisible}
          supportedOrientations={['portrait', 'landscape']}
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
        >
          <View style={AppStyles.helpModalContainer}>
            <View style={[AppStyles.flex5]} />

            <Text>{this.state.helpModalText}</Text>

            <View style={[AppStyles.flex5]} />
          </View>

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

        <Spacer size={30} />
      </ScrollView>
    );
  }
}

// Export Component
export default SetupView;
