const rp = require('request-promise')

// API GET Options
const fetchOptions = uri => {
  return {
    uri: `https://journeyedu.herokuapp.com${uri}`,
    headers: { 'User-Agent': 'Request-Promise' },
    json: true
  }
}

// API POST Options
const postOptions = (uri, data) => {
  return {
    method: 'POST',
    uri: `https://journeyedu.herokuapp.com${uri}`,
    body: data,
    json: true
  }
}

const rpFetch = uri => rp(fetchOptions(uri))
const rpPost = (uri, data) => rp(postOptions(uri, data))

module.exports = { rpFetch, rpPost }