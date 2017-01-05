/**
 * App Navigation
 *
 */
import React from 'react';
import { Actions, Scene, ActionConst } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';

// Scenes
import AppLaunch from '@containers/Launch/LaunchContainer';
import TabsScenes from './tabs';
import SessionScene from './session';
import SettingsScene from './settings';

// Routes
export default Actions.create(
  <Scene key={'root'} {...AppConfig.navbarProps}>
    <Scene
      hideNavBar
      key={'splash'}
      component={AppLaunch}
      analyticsDesc={'AppLaunch: Launching App'}
    />

    <Scene key={'app'} {...AppConfig.navbarProps} title={AppConfig.appName} hideNavBar={false} type={ActionConst.RESET}>
      {TabsScenes}
      {SessionScene}
      {SettingsScene}
    </Scene>
  </Scene>,
);
