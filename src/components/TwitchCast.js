import React, { Component } from 'react';
import Header from './Header'
import EntryForm from './EntryForm';
import Footer from './Footer';

import '../styles/TwitchCast.css'

export default class TwitchCast extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <div className="content">
                    <EntryForm />
                </div>
                <Footer />
            </div>
        );
    }
}