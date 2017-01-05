/**
 * Navbar Menu Button
 *
 */
import { Actions } from 'react-native-router-flux';
import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

// Component
class NavbarMenuButton extends Component {
  static componentName = 'NavbarMenuButton';

  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <TouchableOpacity
        onPress={() => Actions.settings()}
        activeOpacity={0.7}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Icon name={'settings-applications'} size={25} color={'#FFF'} />
      </TouchableOpacity>
    );
  }
}

// Export Component
export default NavbarMenuButton;
