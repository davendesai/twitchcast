import React, { Component } from 'react';
import { Dialog } from 'material-ui';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class StreamModal extends Component {
  render() {
    const buttons = this.props.qualities.map(option => {
      const quality = Object.keys(option)[0].toString();
      const url = option[quality];

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

StreamModal.propTypes = {
  open: React.PropTypes.bool.isRequired,
  channel: React.PropTypes.string.isRequired,
  qualities: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired
}