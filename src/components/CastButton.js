import React, { Component } from 'react';

import _ from 'lodash';
import { loadJS } from '../js/loadScript';

import '../styles/CastButton.css'

export default class CastButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
      session: null,
    }
  }

  componentDidMount() {
    // Set the handler before loading the library
    window.__onGCastApiAvailable = this._initCastAPI;
    loadJS("https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1");
  }

  render() {
    return (
      <button id="cast-button" 
              type="submit"
              disabled={ !this.state.enabled }>
              Cast
      </button>
    );
  }

  _initCastAPI = (isAvailable, err) => {
    if (isAvailable) {
      console.log("Google Cast API loaded")

      let appId = window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
      if (this.props.appId) {
        appId = this.props.appId;
      }
      const sessionRequest = new window.chrome.cast.SessionRequest(appId);

      const apiConfig = new window.chrome.cast.ApiConfig(sessionRequest,
                                                       this._sessionListener, 
                                                       this._receiverListener);
      window.chrome.cast.initialize(apiConfig, this._initSuccess, this._initFailure)
    }
    else {
      console.log("Google Cast API not loaded: %s", err);
    }  
  }

  _initSuccess() {
    console.log("Google Cast API successfully initialized");
  }

  _initFailure(err) {
    console.log("Google Cast API failed to initialize: %s", err.code);
  }

  _receiverListener = (receiverAvailability) => {
    if (receiverAvailability === window.chrome.cast.ReceiverAvailability.AVAILABLE) {
      console.log("Cast Receiver(s) found");
      this.setState({ enabled: true });
    } 
  }

  _sessionListener = (session) => {
    console.log("Cast Session created");
    this.session = session;
  }

  cast = (url) => {
    if (!_.isString(url)) {
      this._connectError({ code: "incorrect format" });
      return;
    }

    if (this.session) {
      this.connectSuccess();
    }
    window.chrome.cast.requestSession(this._connectSuccess, this._connectError);
  }

  _connectSuccess() {
    console.log("Connected successfully");
  }

  _connectError(err) {
    console.log("Failed to connect: %s", err.code);
  }
}

CastButton.propTypes = {
  appId: React.PropTypes.string
}