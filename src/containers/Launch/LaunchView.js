/**
 * Launch Screen
 *  - Shows a nice loading screen whilst:
 *  - Checking if user is logged in, and redirects from there
 *
 */
import iCloudStorage from 'react-native-icloudstore';
import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';

// Styles
const styles = StyleSheet.create({});

// Component
class AppLaunch extends Component {
  static componentName = 'AppLaunch';

  componentDidMount = () => {
    Actions.app({ type: 'reset' });

    // iCloudStorage.removeItem('user');

    iCloudStorage.getItem('user').then((response) => {
      if (response) {
        let userData = JSON.parse(response);

        this.props.updateMe({
          ...userData,
        });
      }
    });
  }

  render = () => (
    <View style={[AppStyles.container]}>
      <ActivityIndicator
        animating
        size={'large'}
        color={'#FFFFFF'}
      />
    </View>
  );
}

// Export Component
export default AppLaunch;
