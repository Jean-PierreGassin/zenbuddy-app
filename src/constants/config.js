/* global __DEV__ */
import { AppColors, AppStyles, AppSizes } from '@theme/';

export default {
  // App Details
  appName: 'ZenBuddy',

  // Build Configuration - eg. Debug or Release?
  DEV: __DEV__,

  // URLs
  urls: {
    resetPassword: 'http:// wp-api.mcnam.ee/wp-login.php?action=lostpassword',
    signUp: 'http:// wp-api.mcnam.ee/wp-login.php?action=register',
  },

  // Navbar Props
  navbarProps: {
    hideNavBar: false,
    titleStyle: AppStyles.navbarTitle,
    navigationBarStyle: AppStyles.navbar,
    leftButtonIconStyle: AppStyles.navbarButton,
    rightButtonIconStyle: AppStyles.navbarButton,
    sceneStyle: {
      backgroundColor: AppColors.background,
      paddingTop: AppSizes.navbarHeight,
    },
  },
};
