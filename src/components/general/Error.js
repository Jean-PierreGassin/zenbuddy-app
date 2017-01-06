/**
 * Error Screen
 *
    <Error text={'Server is down'} />
 *
 */
import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import { Spacer, Text } from '@ui/';

// Component
const Error = ({ text }) => (
  <View style={[AppStyles.container, AppStyles.containerCentered]}>
    <Icon name={'warning'} size={50} color={'#FFF'} />

    <Spacer size={10} />

    <Text>{text}</Text>
  </View>
);

Error.propTypes = { text: PropTypes.string };
Error.defaultProps = { text: 'Woops, Something went wrong.' };
Error.componentName = 'Error';

// Export Component
export default Error;
