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
    secondary: '#fe621d',
  },
};

const text = {
  textPrimary: '#ffffff',
  textSecondary: '#777777',
  headingPrimary: brand.brand.primary,
  headingSecondary: brand.brand.primary,
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
