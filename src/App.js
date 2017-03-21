import React, { Component } from 'react';
import TwitchCast from './components/TwitchCast'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <TwitchCast />
      </MuiThemeProvider>
    );
  }
}