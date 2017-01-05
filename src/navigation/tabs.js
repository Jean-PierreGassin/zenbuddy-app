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
import StyleGuide from '@containers/StyleGuideView';
import Recipes from '@containers/recipes/Browse/BrowseContainer';
import RecipeView from '@containers/recipes/RecipeView';

const navbarPropsTabs = {
  ...AppConfig.navbarProps,
  renderRightButton: () => <NavbarMenuButton />,
  sceneStyle: {
    ...AppConfig.navbarProps.sceneStyle,
    paddingBottom: AppSizes.tabbarHeight,
  },
};

/* Routes ==================================================================== */
const scenes = (
  <Scene key={'tabBar'} tabs tabBarIconContainerStyle={AppStyles.tabbar} pressOpacity={1}>
    <Scene
      {...navbarPropsTabs}
      key={'recipesListing'}
      component={Placeholder}
      title={'ZenBuddy'}
      icon={props => TabIcon({ ...props, icon: 'weekend' })}
      analyticsDesc={'Placeholder: Coming Soon'}
    />
    <Scene
      key={'timeline'}
      {...navbarPropsTabs}
      title={'Coming Soon'}
      component={Placeholder}
      icon={props => TabIcon({ ...props, icon: 'person-outline' })}
      analyticsDesc={'Placeholder: Coming Soon'}
    />
    <Scene
      key={'somethingelse'}
      {...navbarPropsTabs}
      title={'Coming Soon'}
      component={Placeholder}
      icon={props => TabIcon({ ...props, icon: 'people-outline' })}
      analyticsDesc={'Placeholder: Coming Soon'}
    />
  </Scene>
);

export default scenes;
