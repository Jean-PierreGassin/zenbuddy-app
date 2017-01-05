/**
 * Tabs Scenes
 *
 */
import React from 'react';
import { Scene } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';

// Scenes
import Settings from '@containers/meditate/settings/SettingsContainer';

const navbarPropsTabs = {
  ...AppConfig.navbarProps,
  sceneStyle: {
    ...AppConfig.navbarProps.sceneStyle,
    paddingBottom: AppSizes.tabbarHeight,
  },
};

/* Routes ==================================================================== */
const scene = (
  <Scene
    {...navbarPropsTabs}
    key={'settings'}
    component={Settings}
    title={'Settings'}
    analyticsDesc={'Settings'}
  />
);

export default scene;
