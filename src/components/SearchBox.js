import React, { Component } from 'react';
import CastButton from './CastButton';
import { TextField } from 'material-ui';

import { getLiveStreams } from '../api/Twitch';

import '../styles/SearchBox.css';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ''
    }
  }

  render() {
    return (
      <div id="twitchcast-searchbox">
        <form onSubmit={this._handleSubmit}>
          <CastButton />

          <TextField id="cast-form"
                     type="text"
                     value={this.state.userInput}
                     onChange={this._handleChange} />
        </form>
      </div>
    );
  }

  _handleChange = (event) => {
    this.setState({ userInput: event.target.value });
  }

  _handleSubmit = (event) => {
    // Prevent submitting form data and triggering GET /?
    event.preventDefault();

    this.props.onSearch();

    // Pull API information from current user input
    getLiveStreams(this.state.userInput).then((streams) => {
      if (streams) {
        this.props.onSuccess(this.state.userInput, streams);
      }
      else {
        this.props.onError();
      }
    });
  }
}

SearchBox.propTypes = {
  onSearch: React.PropTypes.func,
  onSuccess: React.PropTypes.func.isRequired,
  onError: React.PropTypes.func
}