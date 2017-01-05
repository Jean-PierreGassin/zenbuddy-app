/**
 * Friends Screen
 *  - Allows the user to sit through a meditation session
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
class FriendsView extends Component {
  static componentName = 'FriendsView';

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
        <Text>Friends View</Text>
      </View>
    );
  }
}

// Export Component
export default FriendsView;
