import _ from 'lodash';
import requestAPI from '../js/requestNetwork'

export const endpoints = {
  BACKEND: 'http://twitchcast.herokuapp.com/api/streams/<%= channel %>',
  SCREENSHOT: 'http://static-cdn.jtvnw.net/previews-ttv/live_user_<%= channel %>-640x360.jpg',
  CHAT: 'http://twitch.tv/<%= channel %>/chat'
}

export async function getLiveStreams(channelName) {
  let endpoint = _.template(endpoints.BACKEND)({ 'channel': channelName });
  try {
    const backend_response = await requestAPI(endpoint);
    if (backend_response.success) {
      return backend_response.streams;
    }
  }
  catch (err) {
    console.log(err);
  }
}

export function getStreamImageURL(channelName) {
  let endpoint = _.template(endpoints.SCREENSHOT)({ 'channel': channelName });
  return endpoint;
}

export function getStreamChatURL(channelName) {
  let endpoint = _.template(endpoints.CHAT)({ 'channel': channelName });
  return endpoint;
}