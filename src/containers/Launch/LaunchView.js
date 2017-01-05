/**
 * Launch Screen
 *  - Shows a nice loading screen whilst:
 *  - Checking if user is logged in, and redirects from there
 *
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  launchImage: {
    width: AppSizes.screen.width,
    height: AppSizes.screen.height,
  },
});

/* Component ==================================================================== */
class AppLaunch extends Component {
  static componentName = 'AppLaunch';

  static propTypes = {
    login: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    Actions.app({ type: 'reset' });
    // Try to authenticate based on existing token
    // this.props.login()
    //   // Logged in, show index screen
    //   .then(() => Actions.app({ type: 'reset' }))
    //   // Not Logged in, show Login screen
    //   .catch(() => Actions.authenticate({ type: 'reset' }));
  }

  render = () => (
    <View style={[AppStyles.container]}>
      <Image
        source={require('@images/launch.jpg')}
        style={[styles.launchImage, AppStyles.containerCentered]}
      >
        <ActivityIndicator
          animating
          size={'large'}
          color={'#FFFFFF'}
        />
      </Image>
    </View>
  );
}

/* Export Component ==================================================================== */
export default AppLaunch;
