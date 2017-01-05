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
import Placeholder from '@components/general/Placeholder';
import Session from '@containers/meditate/session/SessionContainer';
import Personal from '@containers/meditate/personal/PersonalContainer';
import Friends from '@containers/meditate/friends/FriendsContainer';

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
      key={'session'}
      component={Session}
      title={'ZenBuddy'}
      icon={props => TabIcon({ ...props, icon: 'weekend' })}
      analyticsDesc={'Meditate: Session'}
    />
    <Scene
      key={'personal'}
      {...navbarPropsTabs}
      title={'Statistics'}
      component={Personal}
      icon={props => TabIcon({ ...props, icon: 'person-outline' })}
      analyticsDesc={'Personal: Statistics'}
    />
    <Scene
      key={'friends'}
      {...navbarPropsTabs}
      title={'ZenBuddies'}
      component={Friends}
      icon={props => TabIcon({ ...props, icon: 'people-outline' })}
      analyticsDesc={'Friends: ZenBuddies'}
    />
  </Scene>
);

export default scenes;
