/**
 * App Styles
 *
 */

import { Platform } from 'react-native';

import Colors from './colors';
import Fonts from './fonts';
import Sizes from './sizes';

export default {
  appContainer: {
    backgroundColor: '#000',
  },

  // Default
  container: {
    position: 'relative',
    flexDirection: 'column',
    backgroundColor: Colors.background,
  },
  center: {
    alignItems: 'center',
  },
  containerCentered: {
    height: Sizes.screen.height - Sizes.navbarHeight - Sizes.tabbarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  windowSize: {
    height: Sizes.screen.height,
    width: Sizes.screen.width,
  },

  // Aligning items
  leftAligned: {
    alignItems: 'flex-start',
  },
  centerAligned: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightAligned: {
    alignItems: 'flex-end',
  },

  // Text Styles
  baseText: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.textPrimary,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
      android: {
        fontWeight: '300',
      },
    }),
  },
  p: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.textPrimary,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
      android: {
        fontWeight: '300',
      },
    }),
    marginBottom: 8,
  },
  h1: {
    fontFamily: Fonts.h1.family,
    fontSize: Fonts.h1.size,
    lineHeight: Fonts.h1.lineHeight,
    color: Colors.headingPrimary,
    margin: 0,
    marginBottom: 4,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        fontWeight: '800',
      },
      android: {
        fontWeight: '500',
      },
    }),
  },
  h2: {
    fontFamily: Fonts.h2.family,
    fontSize: Fonts.h2.size,
    lineHeight: Fonts.h2.lineHeight,
    color: Colors.headingPrimary,
    margin: 0,
    marginBottom: 4,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        fontWeight: '800',
      },
      android: {
        fontWeight: '500',
      },
    }),
  },
  h3: {
    fontFamily: Fonts.h3.family,
    fontSize: Fonts.h3.size,
    lineHeight: Fonts.h3.lineHeight,
    color: Colors.headingPrimary,
    margin: 0,
    marginBottom: 4,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
      android: {
        fontWeight: '300',
      },
    }),
  },
  h4: {
    fontFamily: Fonts.h4.family,
    fontSize: Fonts.h4.size,
    lineHeight: Fonts.h4.lineHeight,
    color: Colors.headingPrimary,
    margin: 0,
    marginBottom: 4,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        fontWeight: '800',
      },
      android: {
        fontWeight: '500',
      },
    }),
  },
  h5: {
    fontFamily: Fonts.h5.family,
    fontSize: Fonts.h5.size,
    lineHeight: Fonts.h5.lineHeight,
    color: Colors.headingPrimary,
    margin: 0,
    marginTop: 4,
    marginBottom: 4,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        fontWeight: '800',
      },
      android: {
        fontWeight: '500',
      },
    }),
  },
  strong: {
    fontWeight: '900',
  },
  link: {
    textDecorationLine: 'underline',
    color: Colors.brand.primary,
  },

  // Helper Text Styles
  textCenterAligned: {
    textAlign: 'center',
  },
  textRightAligned: {
    textAlign: 'right',
  },

  // Give me padding
  padding: {
    paddingVertical: Sizes.padding,
    paddingHorizontal: Sizes.padding,
  },
  paddingHorizontal: {
    paddingHorizontal: Sizes.padding,
  },
  paddingLeft: {
    paddingLeft: Sizes.padding,
  },
  paddingRight: {
    paddingRight: Sizes.padding,
  },
  paddingVertical: {
    paddingVertical: Sizes.padding,
  },
  paddingTop: {
    paddingTop: Sizes.padding,
  },
  paddingBottom: {
    paddingBottom: Sizes.padding,
  },
  paddingSml: {
    paddingVertical: Sizes.paddingSml,
    paddingHorizontal: Sizes.paddingSml,
  },
  paddingHorizontalSml: {
    paddingHorizontal: Sizes.paddingSml,
  },
  paddingLeftSml: {
    paddingLeft: Sizes.paddingSml,
  },
  paddingRightSml: {
    paddingRight: Sizes.paddingSml,
  },
  paddingVerticalSml: {
    paddingVertical: Sizes.paddingSml,
  },
  paddingTopSml: {
    paddingTop: Sizes.paddingSml,
  },
  paddingBottomSml: {
    paddingBottom: Sizes.paddingSml,
  },

  // General HTML-like Elements
  hr: {
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    height: 1,
    backgroundColor: 'transparent',
    marginTop: Sizes.padding,
    marginBottom: Sizes.padding,
  },

  // Grid
  row: {
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  flex6: {
    flex: 6,
  },
  flex7: {
    flex: 7,
  },
  flex8: {
    flex: 8,
  },
  flex9: {
    flex: 9,
  },
  flex10: {
    flex: 10,
  },

  // Buttons
  primaryButton: {
    flex: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: Sizes.buttonHeight,
    backgroundColor: Colors.brand.primary,
  },
  primaryButtonDisabled: {
    borderWidth: 0,
    backgroundColor: Colors.brand.disabled,
  },
  buttonIcon: {
    position: 'absolute',
    right: 4,
    top: 5,
  },
  headerHelpButtonIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  helpModalCloseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: Sizes.tabbarHeight,
    backgroundColor: Colors.brand.primary,
  },

  // Pills
  primaryPill: {
    flex: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.border,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.brand.primary,
  },

  // Modals
  modalContainer: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 250,
    position: 'absolute',
    flexDirection: 'column',
    backgroundColor: Colors.background,
  },
  helpModalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  helpModalInnerContainer: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: Colors.brand.primary,
  },
  modalPickerItem: {
    color: Colors.brand.secondary,
  },
  modalScrollView: {
    padding: 20,
    alignItems: 'center',
  },
  modalCloseButton: {
    height: 45,
    padding: 20,
    backgroundColor: '#FD8145',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  // Navbar
  navbar: {
    backgroundColor: Colors.brand.primary,
    borderBottomWidth: 0,
  },
  navbarTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size,
    ...Platform.select({
      ios: {
        top: 5,
      },
      android: {
        top: 8,
      },
    }),
  },
  navbarButton: {
    tintColor: '#ffffff',
  },

  // TabBar
  tabbar: {
    backgroundColor: '#ffffff',
    borderTopColor: '#ffffff',
    borderTopWidth: 1,
  },

  // Custom mixins
  noRadiusTop: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  noRadiusBottom: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
};
