import React, { Component } from 'react';
import { TextField, CircularProgress } from 'material-ui';
import CastButton from './CastButton';
import EntryModal from './EntryModal';

import { getLiveStreams } from '../api/Twitch'

import '../styles/EntryForm.css';

export default class EntryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            availableStreams: [ ],
            showModal: false,
            isLoading: false
        }
    }
    
    render() {
        return (
            <div>
                <div id="twitchcast-entryform-input">
                    <form onSubmit={this._handleSubmit}>
                        <CastButton ref={input => this.button = input} />
                        <TextField id="cast-form"
                                   type="text"
                                   value={this.state.userInput}
                                   onChange={this._handleChange} />
                    </form>

                    <EntryModal open={this.state.showModal}
                                streams={this.state.availableStreams}
                                onSelect={this._handleSelect}
                                onClose={this._handleClose} />
                </div>
                <div id="twitchcast-entryform-loader">
                    { this.state.isLoading ? <CircularProgress size={ 35 } /> : null }
                </div>
            </div>
        );
    }

    _handleChange = (event) => {
        this.setState({ userInput: event.target.value });
    }

    _handleSubmit = (event) => {
        // Prevent submitting form data and triggering GET /?
        event.preventDefault();

        // Pull API information from current user input
        getLiveStreams(this.state.userInput).then((streams) => {
            // Hide loading spinner no matter the response
            this.setState({ isLoading: false });

            if (streams) {
                this.setState({
                    availableStreams: streams,
                    showModal: true
                });
            }
        });

        // Show loading spinner
        this.setState({ isLoading: true });
    }

    _handleSelect = (url) => {
        // Cast selected URL
        this.setState({ isLoading: false });
        this.button.cast(url);
    }

    _handleClose = () => {
        // Closed the modal (either before or after casting)
        this.setState({ 
            isLoading: false,
            showModal: false 
        });
    }
}