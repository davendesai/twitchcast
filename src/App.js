import React, { Component } from 'react';
import TwitchCast from './components/TwitchCast'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <TwitchCast />
      </MuiThemeProvider>
    );
  }
}