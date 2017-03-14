import React, { Component } from 'react';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';

export default class TwitchCastModal extends Component {
  render() {
    return (
      <Modal show={ this.props.show }
             onHide={ this.props.onClose }>

        <Modal.Body>
          <ButtonGroup>
            {
              this.props.streams.map(stream => {
                const quality = Object.keys(stream)[0].toString()
                const url = stream[quality]

                return <Button key={ quality }
                               onClick={ () => this.props.onSelect(url) }>
                               { quality }</Button>
              })
            }
          </ButtonGroup>
        </Modal.Body>

      </Modal>
    )
  }
}

TwitchCastModal.propTypes = {
  show: React.PropTypes.bool.isRequired,
  streams: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired
}