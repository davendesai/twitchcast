import React, { Component } from 'react';

import loadJS from '../js/loadScript';
import '../styles/CastButton.css'

class CastButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
      session: null
    }
  }
  componentWillMount() {
    // Set the handler before loading the library
    window.__onGCastApiAvailable = this.initCastAPI;
    loadJS("https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1");
  }

  render() {
    return (
      <button id="cast-button" disabled={!this.state.enabled} onClick={this.cast}>Cast</button>
    );
  }

  initCastAPI = (isAvailable, err) => {
    if (isAvailable) {
      console.log("Google Cast API loaded")
      const appId = window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
      const sessionRequest = new window.chrome.cast.SessionRequest(appId);

      const apiConfig = new window.chrome.cast.ApiConfig(sessionRequest,
                                                       this.sessionListener, 
                                                       this.receiverListener);
      window.chrome.cast.initialize(apiConfig, this.initSuccess, this.initFailure)
    }
    else {
      console.log("Google Cast API not loaded: %s", err);
    }  
  }

  initSuccess() {
    console.log("Google Cast API successfully initialized");
  }

  initFailure(err) {
    console.log("Google Cast API failed to initialize: %s", err);
  }

  receiverListener = (receiverAvailability) => {
    if (receiverAvailability === window.chrome.cast.ReceiverAvailability.AVAILABLE) {
      console.log("Cast Receiver(s) found");
      this.setState({
        enabled: true
      });
    } 
  }

  sessionListener = (session) => {
    console.log("Cast Session created");
    this.session = session;
  }

  cast = () => {
    if (this.session) {
      this.castSuccess();
    }
    window.chrome.cast.requestSession(this.castSuccess, this.castError);
  }

  castSuccess() {
    console.log("Casted successfully");
  }

  castError(err) {
    console.log("Failed to cast: %s", err);
  }
}

export default CastButton;