// Inject a script into the DOM and call the associated callback.
// http://stackoverflow.com/questions/40611797/react-only-run-file-once-external-js-file-loaded-gapi-not-defined 
export function loadJS(url, cb) {
  const script = document.createElement('script');
  script.type = 'text/javascript';

  script.src = url;
  script.async = true;

  script.onload = cb;
  document.body.appendChild(script);
}