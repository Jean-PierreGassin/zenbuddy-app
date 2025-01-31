/**
 * Loading Screen
 *
     <Loading text={'Server is down'} />
 *
 */
import React, { PropTypes } from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import { Spacer, Text } from '@ui/';

// Component
const Loading = ({ text, transparent }) => (
  <View
    style={[
      AppStyles.container,
      AppStyles.containerCentered,
      transparent && { backgroundColor: 'rgba(255,255,255,0.75)' },
    ]}
  >
    <ActivityIndicator
      animating
      size={'large'}
      color={'#FFFFFF'}
    />

    <Spacer size={10} />

    {text &&
      <Text>{text}</Text>
    }
  </View>
);

Loading.propTypes = {
  text: PropTypes.string,
  transparent: PropTypes.bool,
};

// Export Component
export default Loading;
