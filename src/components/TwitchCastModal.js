import React, { Component } from 'react';
import { Dialog } from 'material-ui';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class TwitchCastModal extends Component {
  render() {
    const buttons = this.props.streams.map(stream => {
      const quality = Object.keys(stream)[0].toString();
      const url = stream[quality];

      return <button key={ quality }
                     onClick={() => this.props.onSelect(url)}>
                     { quality }
             </button>
    });

    return (
      <Dialog open={this.props.open}
              onRequestClose={this.props.onClose}>
              { buttons }
      </Dialog>
    );
  }
}

TwitchCastModal.propTypes = {
  open: React.PropTypes.bool.isRequired,
  streams: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired
}