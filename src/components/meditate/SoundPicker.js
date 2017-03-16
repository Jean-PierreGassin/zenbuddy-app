/**
 * Session length picker
 *
    <SoundPicker
      selectedSound={'Bleep'}
      onPress={() => {}}
    />
 *
 */
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements';
import React, { PropTypes, Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';

// Components
import { Text } from '@ui/';

// Consts and Libs
import { AppStyles } from '@theme/';

class SoundPicker extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    selectedSound: PropTypes.string,
  };

  onPress = (sound) => {
    const soundFile = new Sound(sound.file, Sound.MAIN_BUNDLE, () => {
      soundFile.play(() => {});
    });

    this.props.onPress(sound);
  }

  buildPicker = () => {
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
              onPress={() => this.onPress(sound)}
              hitSlop={{ top: 1, right: 10, bottom: 1, left: 10 }}
              style={AppStyles.primaryButton}
            >
              <Text>{sound.name}</Text>

              {this.props.selectedSound === sound.file &&
                <Icon name={'done'} size={35} color={'#fe621d'} containerStyle={AppStyles.buttonIcon} />
              }

              {this.props.selectedSound !== sound.file &&
                <Icon name={'play-circle-filled'} size={35} color={'#fe621d'} containerStyle={AppStyles.buttonIcon} />
              }
            </TouchableOpacity>
          </View>

        ))}
      </ScrollView>
    );
  }

  render = () => this.buildPicker();
}

// Export Component
export default SoundPicker;
