import _ from 'lodash';
import requestAPI from '../js/requestAPI'

const endpoints = {
  BACKEND: 'http://twitchcast.herokuapp.com/api/streams/<%= channel %>',
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