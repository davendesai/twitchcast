import React, { Component } from 'react';
import SearchBox from './SearchBox';
import LoadingIndicator from './LoadingIndicator';
import StreamModal from './StreamModal';

import _ from 'lodash';
import { getStreamChatURL } from '../api/Twitch';
import { cast } from '../js/castAPI';

import makeShaking from '../anim/makeShaking';
const ShakingSearchBox = makeShaking(SearchBox);

export default class EntryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: '',
            qualities: [ ],
            showModal: false,
            isLoading: false,
            showError: false
        }
    }

    render() {
        return (
            <div>
                <ShakingSearchBox shake={this.state.showError}
                                  onSearch={this._handleSearch}
                                  onSuccess={this._handleSearchSuccess}
                                  onError={this._handleSearchError} />

                <StreamModal open={this.state.showModal}
                             channel={this.state.channel}
                             qualities={this.state.qualities}
                             onSelect={this._handleModalSelect}
                             onClose={this._handleModalClose} />

                <LoadingIndicator show={this.state.isLoading} />
            </div>
        );
    }

    _handleSearch = () => {
        this.setState({
            isLoading: true,
            showError: false
        });
    }

    _handleSearchSuccess = (query, searchResults) => {
        this.setState({
            channel: query,
            qualities: searchResults,
            showModal: true,
            isLoading: false
        })
    }

    _handleSearchError = () => {
        this.setState({
            isLoading: false,
            showError: true
        });
    }

    _handleModalSelect = (selection) => {
        // Cast selected quality
        cast(selection).then(() => {
            // Redirect to channel's chat
            window.location.href = getStreamChatURL(this.state.channel);
        });
    }

    _handleModalClose = () => {
        this.setState({
            showModal: false
        })
    }
}