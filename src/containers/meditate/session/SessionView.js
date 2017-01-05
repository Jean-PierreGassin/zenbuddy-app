/**
 * Session Screen
 *  - Allows the user to sit through a meditation session
 *
 */
import { Icon } from 'react-native-elements';
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
  playIcon: {
    position: 'absolute',
    right: 4,
    top: 4,
  },
});

// Component
class SessionView extends Component {
  static componentName = 'SessionView';

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render = () => {
    if (this.state.loading) return <Loading />;
    if (this.state.error) return <Error text={this.state.error} />;

    return (
      <View style={[AppStyles.containerCentered]}>
        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={{ top: 10, right: 10, bottom: 5, left: 10 }}
          style={AppStyles.primaryButton}>
          <Text>Set your session length</Text>
        </TouchableOpacity>

        <Spacer size={10} />

        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={{ top: 5, right: 10, bottom: 10, left: 10 }}
          style={AppStyles.primaryButton}>
          <Text>Pick a mindful sound</Text>
        </TouchableOpacity>

        <Spacer size={50} />

        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          style={AppStyles.primaryButton}>
          <Text>Begin Your Session</Text>
          <Icon name={'play-circle-filled'} size={35} color={'#fe621d'} containerStyle={styles.playIcon} />

        </TouchableOpacity>
      </View>
    );
  }
}

// Export Component
export default SessionView;
