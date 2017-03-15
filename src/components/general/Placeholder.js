/**
 * Coming Soon
 *
    <ComingSoon text={"Hello World"} />
 *
 */
import React, { PropTypes } from 'react';
import { View } from 'react-native';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import { Text } from '@ui/';

// Component
const ComingSoon = ({ text }) => (
  <View style={[AppStyles.container, AppStyles.containerCentered]}>
    <Text>{text}</Text>
  </View>
);

ComingSoon.propTypes = { text: PropTypes.string };
ComingSoon.defaultProps = { text: 'Coming soon...' };
ComingSoon.componentName = 'ComingSoon';

// Export Component
export default ComingSoon;
