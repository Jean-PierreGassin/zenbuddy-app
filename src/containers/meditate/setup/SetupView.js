/**
 * Setup Screen
 *  - Allows the user to sit through a meditation session
 *
 */
import iCloudStorage from 'react-native-icloudstore';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import React, { Component, PropTypes } from 'react';
import {
  View,
  Alert,
  Modal,
  Picker,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';

// Components
import { Text, Spacer } from '@ui/';
import Loading from '@components/general/Loading';
import Error from '@components/general/Error';

// Component
class SetupView extends Component {
  static componentName = 'SetupView';

  static propTypes = {
    updateMe: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      modalType: 'none',
      modalVisible: false,
      sessionLengths: [],
      sessionSounds: [],
      sessionIntervals: [],
      sessionLength: 0,
      readableSessionLength: 'Set your session length',
      sessionSound: 0,
      readableSessionSound: 'Pick a mindful sound',
      readableSessionInterval: 'Choose your mindful intervals',
    };
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
      { name: 'Piccolo', file: 'piccolo.wav' },
      { name: 'Ting', file: 'ting.wav' },
      { name: 'Water Drop', file: 'water-drop.wav' },
    ];

    return (
      <ScrollView contentContainerStyle={AppStyles.modalScrollView}>
        {sounds.map(sound => (
          <TouchableOpacity
            key={`SOUND-${sound.name}`}
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

    for (let intervals = 3; intervals <= 8; intervals += 1) {
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

  showHint = () => {
    Alert.alert(
      'ZenBuddy',
      'Session intervals are the amount of times your selected sound will play during your session, this is helpful for when you want a cue to move onto your next mental exercise',
      [
        { text: 'Got it!', onPress: () => {} },
      ],
    );
  }

  render = () => {
    if (this.state.loading) return <Loading />;
    if (this.state.error) return <Error text={this.state.error} />;

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
      <View style={[AppStyles.containerCentered]}>
        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={{ top: 10, right: 10, bottom: 5, left: 10 }}
          onPress={() => this.toggleModal('sessionLengths')}
          style={AppStyles.primaryButton}
        >
          <Text>{this.state.readableSessionLength}</Text>
        </TouchableOpacity>

        <Spacer size={10} />

        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={{ top: 5, right: 10, bottom: 10, left: 10 }}
          onPress={() => this.toggleModal('sessionSounds')}
          style={AppStyles.primaryButton}
        >
          <Text>{this.state.readableSessionSound}</Text>
        </TouchableOpacity>

        <Spacer size={10} />

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
            onPress={() => this.showHint()}
            style={AppStyles.buttonIcon}
          >
            <Icon name={'help'} size={35} color={'#fe621d'} />
          </TouchableOpacity>
        </TouchableOpacity>

        <Spacer size={50} />

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

        <Modal
          transparent
          animationType={'slide'}
          visible={this.state.modalVisible}
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
      </View>
    );
  }
}

// Export Component
export default SetupView;
