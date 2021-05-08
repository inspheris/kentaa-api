var request = require('request');

const BASE_URL = 'https://api.kentaa.nl'
const VERSION = 'v1'

module.exports = class QueuedRequest {
  constructor(requestOptions, kentaaApi) {
    this.requestOptions = requestOptions;
    this.kentaaApi = kentaaApi;
    this.resolve = null;
    this.reject = null;
  }

  get promise(){
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  dequeue(){
    // do the request
    request({
      headers: {
        'X-Api-Key': this.kentaaApi.apiKey
      },
      uri: `${BASE_URL}/${VERSION}/${this.requestOptions.apiLocation}${this.requestOptions.params}`,
      method: this.requestOptions.requestType
    }, function (err, res, body) {
      //update remaining requests per minute / hour
      this.kentaaApi.setRemainingRequestThisMinute(Number(res.headers['x-ratelimit-remaining-minute']));
      this.kentaaApi.setRemainingRequestThisHour(Number(res.headers['x-ratelimit-remaining-hour']));
      //console.log(`Remaining requests this minute: ${this.kentaaApi.remainingRequestThisMinute} / this hour: ${this.kentaaApi.remainingRequestThisHour}`)

      if(!(err)) {
        //resolve with the body, which contains the json response.
        this.resolve(JSON.parse(body));
      }
      else {
        this.reject();
      }
      // dequeue the next request if there is one in the queue
      this.kentaaApi.dequeueNextRequest();
    }.bind(this));
  }
}