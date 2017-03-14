// Return a promise that can be `await`-ed
export default function requestAPI(endpoint) {
  return fetch(endpoint).then(response => {
    return response.json();
  });
}