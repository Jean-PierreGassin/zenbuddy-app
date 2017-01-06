/**
 * Settings Screen
 *
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  InteractionManager,
} from 'react-native';

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';

// Components
import { Text } from '@ui/';
import Loading from '@components/general/Loading';
import Error from '@components/general/Error';

// Styles
const styles = StyleSheet.create({});

// Component
class SettingsView extends Component {
  static componentName = 'SettingsView';

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
      <View style={AppStyles.containerCentered}>
        <Text h6>ZenBuddy v1.0.0</Text>
        <Text h6>Created by Jean-Pierre Gassin</Text>
      </View>
    );
  }
}

// Export Component
export default SettingsView;
