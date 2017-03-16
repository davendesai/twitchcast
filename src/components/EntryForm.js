import React, { Component } from 'react';
import { TextField } from 'material-ui';
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
            showModal: false
        }
    }
    
    render() {
        return (
            <div id="twitchcast-entryform">
                <form onSubmit={ this._handleSubmit }>
                    <CastButton ref={ input => this.button = input } />
                    <TextField id="cast-form"
                               type="text"
                               value={ this.state.userInput }
                               onChange={ this._handleChange } />
                </form>

                <EntryModal open={ this.state.showModal }
                            streams={ this.state.availableStreams }
                            onSelect={ this._handleSelect }
                            onClose={ this._handleClose } />
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
            if (streams) {
                this.setState({
                    availableStreams: streams,
                    showModal: true 
                });
            }
        });
    }

    _handleSelect = (url) => {
        this.button.cast(url);
    }

    _handleClose = () => {
        this.setState({ showModal: false });
    }
}