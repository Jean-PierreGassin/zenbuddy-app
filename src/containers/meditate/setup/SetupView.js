/**
 * Setup Screen
 *  - Allows the user to sit through a meditation session
 *
 */
/* global fetch */

import iCloudStorage from 'react-native-icloudstore';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';
import {
  View,
  Modal,
  Platform,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// Consts and Libs
import { AppStyles } from '@theme/';
import { AppInfo, AppQuotes } from '@lib/info';

// Components
import { Text, Spacer } from '@ui/';
import SoundPicker from '@meditate/SoundPicker';
import CustomPicker from '@meditate/CustomPicker';

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

  toggleModal = (type) => {
    this.setState({
      modalType: type,
      modalVisible: !this.state.modalVisible,
    });
  }

  startIOSSession = () => {
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

  startAndroidSession = async () => {
    const user = await AsyncStorage.getItem('user');
    let userData = {};

    if (user) {
      userData = JSON.parse(user);
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
  }

  showHelpModal = () => {
    this.setState({
      helpModalText: AppInfo.intervalHelpText,
      helpModalVisible: true,
    });
  }

  isButtonDisabled = () => {
    if (!this.state.sessionLength || !this.state.sessionSound || !this.state.sessionInterval) {
      return true;
    }

    return false;
  }

  render = () => {
    const buttonDisabled = this.isButtonDisabled();

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
            onPress={() => {
              if (Platform.OS === 'ios') {
                this.startIOSSession();
              }

              if (Platform.OS === 'android') {
                this.startAndroidSession();
              }
            }}
            style={[AppStyles.primaryButton, buttonDisabled && AppStyles.primaryButtonDisabled]}
          >
            <Text>Begin your session</Text>
            <Icon name={'play-circle-filled'} size={36} color={'#fe621d'} containerStyle={AppStyles.buttonIcon} />
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
          onRequestClose={() => this.setState({ helpModalVisible: false })}
        >
          <View style={AppStyles.modalContainer}>
            <TouchableOpacity
              style={AppStyles.modalCloseButton}
              onPress={() => this.setState({ modalVisible: false })}
            >
              <Text h4>Close</Text>
            </TouchableOpacity>

            {this.state.modalType === 'sessionLengths' &&
              <CustomPicker
                minValue={5}
                maxValue={120}
                type={'minutes'}
                selectedValue={this.state.sessionLength}
                onValueChange={(value) => {
                  if (value) {
                    this.setState({
                      sessionLength: value,
                      readableSessionLength: `Your session will be ${value} minutes long`,
                    });
                  }
                }}
              />
            }

            {this.state.modalType === 'sessionSounds' &&
              <SoundPicker
                selectedSound={this.state.sessionSound}
                onPress={(sound) => {
                  this.setState({
                    sessionSound: sound.file,
                    readableSessionSound: `You'll be listening to ${sound.name}`,
                  });
                }}
              />
            }

            {this.state.modalType === 'sessionIntervals' &&
              <CustomPicker
                minValue={3}
                maxValue={12}
                type={'intervals'}
                selectedValue={this.state.sessionInterval}
                onValueChange={(interval) => {
                  if (interval) {
                    this.setState({
                      sessionInterval: interval,
                      readableSessionInterval: `${interval} times during your session`,
                    });
                  }
                }}
              />
            }
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

        <Spacer size={30} />
      </ScrollView>
    );
  }
}

// Export Component
export default SetupView;
