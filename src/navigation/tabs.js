/**
 * Tabs Scenes
 *
 */
import React from 'react';
import { Scene } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';

// Components
import { TabIcon } from '@ui/';
import { NavbarMenuButton } from '@containers/ui/NavbarMenuButton/NavbarMenuButtonContainer';

// Scenes
import Setup from '@containers/meditate/setup/SetupContainer';
import Personal from '@containers/meditate/personal/PersonalContainer';

const navbarPropsTabs = {
  ...AppConfig.navbarProps,
  renderRightButton: () => <NavbarMenuButton />,
  sceneStyle: {
    ...AppConfig.navbarProps.sceneStyle,
    paddingBottom: AppSizes.tabbarHeight,
  },
};

// Routes
const scenes = (
  <Scene key={'tabBar'} tabs tabBarIconContainerStyle={AppStyles.tabbar} pressOpacity={1}>
    <Scene
      {...navbarPropsTabs}
      key={'setup'}
      component={Setup}
      title={'ZenBuddy'}
      icon={props => TabIcon({ ...props, icon: 'weekend' })}
      analyticsDesc={'Session: Setup'}
    />
    <Scene
      key={'personal'}
      {...navbarPropsTabs}
      title={'Statistics'}
      component={Personal}
      icon={props => TabIcon({ ...props, icon: 'person-outline' })}
      analyticsDesc={'Personal: Statistics'}
    />
  </Scene>
);

export default scenes;
