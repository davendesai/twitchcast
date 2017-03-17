export function initCast(isAvailable, err) {
  if (isAvailable) {
    console.log("Google Cast API loaded")

    let appId = window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;

    const sessionRequest = new window.chrome.cast.SessionRequest(appId);
    const apiConfig = new window.chrome.cast.ApiConfig(sessionRequest, null, _receiverListener);

    window.chrome.cast.initialize(apiConfig,
      () => { console.log("Google Cast API initialized") },
      (err) => { console.log("Failed to initialize Google Cast API: %s", err.code) });
  }
  else {
    console.log("Failed to load Google Cast API: %s", err);
  }
}

function _receiverListener(receiverAvailability) {
  if (receiverAvailability === window.chrome.cast.ReceiverAvailability.AVAILABLE) {
    console.log("Cast Receiver(s) found");
  }
}

export function cast(url) {
  window.chrome.cast.requestSession(
    (session) => _castSuccess(session, url),
    (err) => { console.log("Failed to create session: %s", err.code) });
}

function _castSuccess(session, url) {
  console.log("Cast Session found/created");

  const mediaInfo = new window.chrome.cast.media.MediaInfo(url);
  mediaInfo.contentType = 'video/mp4';

  const request = new window.chrome.cast.media.LoadRequest(mediaInfo);
  request.autoplay = true;

  session.loadMedia(request,
    () => { console.log("Began casting") },
    (err) => { console.log("Failed to cast: %s", err.code) });
}