/**
 * Index - this is where everything
 *  starts - but offloads to app.js
 *
 */
/* global __DEV__ */
import React from 'react';
import { StatusBar } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Router } from 'react-native-router-flux';

// Consts and Libs
import { AppStyles } from '@theme/';
import AppRoutes from '@navigation/';

// All redux reducers (rolled into one mega-reducer)
import rootReducer from '@redux/index';

// Connect RNRF with Redux
const RouterWithRedux = connect()(Router);

// Load middleware
let middleware = [
  // Analytics,
  thunk, // Allows action creators to return functions (not just plain objects)
];

if (__DEV__) {
  // Dev-only middleware
  middleware = [
    ...middleware,
    logger(), // Logs state changes to the dev console
  ];
}

// Change status bar colour
StatusBar.setBarStyle('light-content');

// Init redux store (using the given reducer & middleware)
const store = compose(
  applyMiddleware(...middleware),
)(createStore)(rootReducer);

// Component
// Wrap App in Redux provider (makes Redux available to all sub-components)
export default function AppContainer() {
  return (
    <Provider store={store}>
      <RouterWithRedux scenes={AppRoutes} style={AppStyles.appContainer} />
    </Provider>
  );
}
