/**
 * Session Screen
 *  - Allows the user to sit through a meditation session
 *
 */
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements';
import React, { Component, PropTypes } from 'react';
import {
  View,
  Modal,
  Picker,
  ScrollView,
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
  playIcon: {
    position: 'absolute',
    right: 4,
    top: 4,
  },
  modalCloseButton: {
    height: 45,
    padding: 20,
    backgroundColor: '#FD8145',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

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

  toggleModal = (type) => {
    this.setState({
      modalType: type,
      modalVisible: !this.state.modalVisible,
    });
  }

  getSessionLengths = () => {
    const sessionLengths = [];

    for (let time = 5; time <= 120; time++) {
      sessionLengths.push(
        <Picker.Item
          key={time}
          label={`${time} minutes`}
          value={time}
        />
      );
    }

    const picker = (
      <Picker
        itemStyle={AppStyles.modalPickerItem}
        selectedValue={this.state.sessionLength}
        onValueChange={(length) => this.setState({
          sessionLength: length,
          readableSessionLength: `Session length: ${length} minutes`,
        })
      }>
        {sessionLengths}
      </Picker>
    );

    return picker;
  }

  getSessionSounds = () => {
    const sounds = [
      { name: 'Birds', 'file': 'click.mp3' },
      { name: 'Waves', 'file': 'test.mp3' },
      { name: 'Drums', 'file': 'zzz.mp3' },
    ];

    return (
      <ScrollView contentContainerStyle={AppStyles.modalScrollView}>
        {sounds.map((sound) => (
          <TouchableOpacity
            key={`SOUND-${sound.name}`}
            activeOpacity={0.7}
            onPress={() => {
              this.playSound(sound.file);

              this.setState({
                sessionSound: sound.file,
                readableSessionSound: `You'll be listening to: ${sound.name}`,
              });
            }}
            hitSlop={{ top: 1, right: 10, bottom: 1, left: 10 }}
            style={AppStyles.primaryButton}>
            <Text>{sound.name}</Text>

            {this.state.sessionSound === sound.file &&
              <Icon name={'done'} size={35} color={'#fe621d'} containerStyle={styles.playIcon} />
            }

            {this.state.sessionSound !== sound.file &&
              <Icon name={'play-circle-filled'} size={35} color={'#fe621d'} containerStyle={styles.playIcon} />
            }
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  playSound = (file) => {
    let soundFile = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
      soundFile.play((success) => {});
    });
  }

  render = () => {
    if (this.state.loading) return <Loading />;
    if (this.state.error) return <Error text={this.state.error} />;

    let modalContents;
    let buttonDisabled = !this.state.sessionLength || !this.state.sessionSound;

    if (this.state.modalType === 'sessionLengths') {
      modalContents = this.getSessionLengths();
    }

    if (this.state.modalType === 'sessionSounds') {
      modalContents = this.getSessionSounds();
    }

    return (
      <View style={[AppStyles.containerCentered]}>
        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={{ top: 10, right: 10, bottom: 5, left: 10 }}
          onPress={() => this.toggleModal('sessionLengths')}
          style={AppStyles.primaryButton}>
          <Text>{this.state.readableSessionLength}</Text>
        </TouchableOpacity>

        <Spacer size={10} />

        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={{ top: 5, right: 10, bottom: 10, left: 10 }}
          onPress={() => this.toggleModal('sessionSounds')}
          style={AppStyles.primaryButton}>
          <Text>{this.state.readableSessionSound}</Text>
        </TouchableOpacity>

        <Spacer size={50} />

        <TouchableOpacity
          disabled={buttonDisabled}
          activeOpacity={0.7}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          style={[AppStyles.primaryButton, buttonDisabled && AppStyles.primaryButtonDisabled]}>
          <Text>Begin Your Session</Text>
          <Icon name={'play-circle-filled'} size={35} color={'#fe621d'} containerStyle={styles.playIcon} />
        </TouchableOpacity>

        <Modal
          transparent
          animationType={"slide"}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}>
          <View style={AppStyles.modalContainer}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => this.setState({modalVisible: false})}>
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
export default SessionView;
