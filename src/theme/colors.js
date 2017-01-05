/**
 * App Theme - Colors
 *
 */

const app = {
  background: '#fe621d',
};

const brand = {
  brand: {
    primary: '#FD8145',
    secondary: '#ffffff',
    disabled: '#FDB591',
  },
};

const text = {
  textPrimary: '#ffffff',
  textSecondary: '#777777',
  headingPrimary: brand.brand.secondary,
  headingSecondary: brand.brand.secondary,
};

const borders = {
  border: '#fe621d',
};

const tabbar = {
  tabbar: {
    background: '#ffffff',
    iconDefault: '#BABDC2',
    iconSelected: brand.brand.primary,
  },
};

export default {
  ...app,
  ...brand,
  ...text,
  ...borders,
  ...tabbar,
};
