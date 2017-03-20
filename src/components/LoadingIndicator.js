import React, { Component } from 'react';
import { CircularProgress } from 'material-ui';

import '../styles/LoadingIndicator.css';

export default class LoadingIndicator extends Component {
  render() {
    return(
      <div id="twitchcast-loadingindicator">
        {this.props.show ? <CircularProgress size={35} color="white" /> : null}
      </div>
    );
  }
}

LoadingIndicator.propTypes = {
  show: React.PropTypes.bool.isRequired
}