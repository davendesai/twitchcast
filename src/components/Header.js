import React, { Component } from 'react';

import '../styles/Header.css';
import github from '../../res/github.png';


export default class Header extends Component {
  render() {
    const GITHUB_URL = "http://github.com/davendesai/twitchcast";

    return (
      <div id="twitchcast-header">
        <a href={ GITHUB_URL } >
          <img src={ github } alt="GitHub" />
        </a>
      </div>
    )
  }
}