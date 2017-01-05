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
        style={{ top: 2 }}
        hitSlop={{ top: 7, right: 7, bottom: 7, left: 7 }}
      >
        <Icon name={'settings'} size={32} color={'#FFF'} />
      </TouchableOpacity>
    );
  }
}

// Export Component 
export default NavbarMenuButton;
