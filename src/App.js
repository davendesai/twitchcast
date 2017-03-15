import React, { Component } from 'react';
import Header from './components/Header';
import TwitchCast from './components/TwitchCast'
import Footer from './components/Footer';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="app-content">
          <TwitchCast />
        </div>
        <Footer />
      </div>
    );
  }
}