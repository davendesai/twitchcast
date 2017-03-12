import React, { Component } from 'react';

import CastButton from './CastButton';

export default class TwitchChannelForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <CastButton ref="button" submit={this.handleSubmit} />
            </form>
        );
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit = (event) => {
        // Prevent submitting form data and triggering GET /?
        event.preventDefault();

        // Trigger cast in CastButton
        this.refs.button.cast()
    }
}