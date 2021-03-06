import React, { Component } from 'react';
import { IconButton } from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search';

import { loadJS } from '../js/loadScript';
import { initCast } from '../js/castAPI';

export default class CastButton extends Component {
  componentDidMount() {
    // Set the handler before loading the library
    window.__onGCastApiAvailable = initCast;
    loadJS("https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1");
  }

  render() {
    return (
      <IconButton type="submit" >
        <SearchIcon />
      </IconButton>
    );
  }
}