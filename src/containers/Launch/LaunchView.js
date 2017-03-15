import iCloudStorage from 'react-native-icloudstore';
import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppStyles } from '@theme/';

// Component
class AppLaunch extends Component {
  static componentName = 'AppLaunch';

  static propTypes = {
    updateMe: React.PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    Actions.app({ type: 'reset' });

    // iCloudStorage.removeItem('user');

    iCloudStorage.getItem('user').then((response) => {
      if (response) {
        const userData = JSON.parse(response);

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
