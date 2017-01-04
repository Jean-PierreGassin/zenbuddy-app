/**
 * Buttons
 *
     <Button text={'Server is down'} />
 *
 */
import React, { Component } from 'react';
import { Card } from 'react-native-elements';

// Consts and Libs
import { AppSizes } from '@theme/';

/* Component ==================================================================== */
class CustomCard extends Component {
  cardProps = () => {
    // Defaults
    const props = {
      containerStyle: {
        borderRadius: AppSizes.borderRadius,
      },
      ...this.props,
    };

    return props;
  }

  render = () => (
    <Card {...this.cardProps()} />
  )
}

/* Export Component ==================================================================== */
export default CustomCard;
