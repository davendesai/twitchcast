import React, { Component } from 'react';
import { IconButton } from 'material-ui';

import _ from 'lodash';
import { loadJS } from '../js/loadScript';

import SearchIcon from 'material-ui/svg-icons/action/search';

export default class CastButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: true,
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
      <IconButton id="cast-button"
                  type="submit"
                  disabled={!this.state.enabled} >
                  <SearchIcon />
      </IconButton>
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
                                                       null,
                                                       this._receiverListener);
      window.chrome.cast.initialize(apiConfig, 
                                    () => { console.log("Google Cast API initialized") },
                                    (err) => { console.log("Failed to initialize Google Cast API: %s", err.code) });
    }
    else {
      console.log("Failed to load Google Cast API: %s", err);
    }  
  }

  _receiverListener = (receiverAvailability) => {
    if (receiverAvailability === window.chrome.cast.ReceiverAvailability.AVAILABLE) {
      console.log("Cast Receiver(s) found");
      this.setState({ enabled: true });
    } 
  }

  cast = (url) => {
    if (this.state.session) {
      this._castSuccess(this.state.session, url);
    }
    window.chrome.cast.requestSession((session) => this._castSuccess(session, url), 
                                      (err) => { console.log("Failed to create session: %s", err.code) });
  }

  _castSuccess = (session, url) => {
    console.log("Cast Session found/created");
    this.setState({ session: session });
    this.state.session.addUpdateListener(this._castListener);

    const mediaInfo = new window.chrome.cast.media.MediaInfo(url);
    mediaInfo.contentType = 'video/mp4';

    const request = new window.chrome.cast.media.LoadRequest(mediaInfo);
    request.autoplay = true;

    this.state.session.loadMedia(request, 
                                 () => { console.log("Began casting") }, 
                                 (err) => { console.log("Failed to cast: %s", err.code) });
  }

  _castListener = (isAlive) => {
    if (!isAlive) {
      // Remove session when canceled from Cast button 
      this.setState({ session: null });
    }
  }
}

CastButton.propTypes = {
  appId: React.PropTypes.string
}