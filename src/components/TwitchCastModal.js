import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export default class TwitchCastModal extends Component {
  render() {
    return (
      <Modal show={ this.props.show }
             onHide={ this.props.onClose }>
        <Modal.Body>
          <p>Found Streams</p>
        </Modal.Body>
      </Modal>
    )
  }
}

TwitchCastModal.propTypes = {
  show: React.PropTypes.bool.isRequired,
  streams: React.PropTypes.array.isRequired,
  onStream: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired
}