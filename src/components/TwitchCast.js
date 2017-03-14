import React, { Component } from 'react';
import CastButton from './CastButton';
import TwitchCastModal from './TwitchCastModal';

import { getLiveStreams } from '../api/Twitch'

export default class TwitchCast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            availableStreams: [ ],
            showModal: false
        }
    }
    
    render() {
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <input type="text"
                           value={ this.state.userInput }
                           onChange={ this.handleChange } />

                    <CastButton ref={ input => this.button = input } />
                </form>

                <TwitchCastModal show={ this.state.showModal }
                                 streams={ this.state.availableStreams }
                                 onStream={ this._cast }
                                 onClose={ this._closeModal } />
            </div>
        );
    }

    handleChange = (event) => {
        this.setState({ userInput: event.target.value });
    }

    handleSubmit = (event) => {
        // Prevent submitting form data and triggering GET /?
        event.preventDefault();

        // Pull API information from current user input
        getLiveStreams(this.state.userInput).then((streams) => {
            if (streams) {
                this.setState({
                    availableStreams: streams,
                    showModal: true 
                });
            }
        });
    }

    _cast = (url) => {
        this.button.cast(url);
    }

    _closeModal = (event) => {
        this.setState({ showModal: false });
    }
}