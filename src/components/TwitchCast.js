import React, { Component } from 'react';
import Header from './Header'
import EntryForm from './EntryForm';

import '../styles/TwitchCast.css';
import logo from '../../res/logo.png';

export default class TwitchCast extends Component {
    render() {
        return (
            <div id="twitchcast-container">
                <Header />
                <div id="twitchcast-logo">
                    <img src={logo} alt="TwitchCast" />
                </div>
                <div id="twitchcast-content">
                    <EntryForm />
                </div>
            </div>
        );
    }
}