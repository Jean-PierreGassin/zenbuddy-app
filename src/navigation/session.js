/**
 * Session Scenes
 *
 */
import React from 'react';
import { Scene } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';

// Scenes
import Session from '@containers/meditate/session/SessionContainer';

const navbarPropsTabs = {
  ...AppConfig.navbarProps,
  sceneStyle: {
    ...AppConfig.navbarProps.sceneStyle,
    paddingBottom: AppSizes.tabbarHeight,
  },
};

// Routes
const scene = (
  <Scene
    {...navbarPropsTabs}
    hideNavBar
    direction={'vertical'}
    key={'session'}
    component={Session}
    title={'Session'}
    panHandlers={null}
    analyticsDesc={'Session'}
  />
);

export default scene;
