import _ from 'lodash';
import { getStreamImageURL } from '../api/Twitch';

import React, { Component } from 'react';
import { RaisedButton, Dialog, CircularProgress } from 'material-ui';
import RemoteImage from 'react-remote-image';

import '../styles/StreamModal.css';

const styles = {
  // https://github.com/callemall/material-ui/issues/5775
  modal: {
    border: '1px solid black',
    borderRadius: '8px',
    overflow: 'auto',
    width: 550
  },
  button: {
    margin: 12
  }
}

export default class StreamModal extends Component {
  render() {
    const filter = ['mobile', 'audio', 'best', 'worst'];

    const buttons = this.props.qualities.map(option => {
      const quality = Object.keys(option)[0].toString();
      const url = option[quality];

      // Filter out unnecessary options
      if (!_.includes(filter, quality)) {
        return <RaisedButton key={quality}
                             label={quality}
                             style={styles.button}
                             labelColor='rgb(255, 255, 255)'
                             backgroundColor='rgb(100, 65, 164)'
                             onClick={() => this.props.onSelect(url)} />
      }
      return null;
    });

    return (
      <Dialog open={this.props.open}
              onRequestClose={this.props.onClose}
              contentStyle={styles.modal} >
        <div id="twitchcast-streammodal">
          <div id="twitchcast-streammodal-buttons">
            {buttons}
          </div>
          <div id="twitchcast-streammodal-content">
            <h3>{this.props.channel}</h3>
            <RemoteImage src={getStreamImageURL(this.props.channel)} 
                         width="320" 
                         renderLoading={() => {
                           return <CircularProgress size={35} color='rgb(100, 65, 164)' /> 
                         }} />
          </div>
        </div>
      </Dialog>
    );
  }
}

StreamModal.propTypes = {
  open: React.PropTypes.bool.isRequired,
  channel: React.PropTypes.string.isRequired,
  qualities: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired
}