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
      <Text>Settings View</Text>
    );
  }
}

// Export Component
export default SettingsView;
