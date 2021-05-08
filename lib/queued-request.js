var request = require('request');

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
    request(this.requestOptions.getRequestParams(this.kentaaApi.apiKey), function (err, res, body) {
      if(!(err)) {
        //update remaining requests per minute / hour
        this.kentaaApi.setRemainingRequestThisMinute(Number(res.headers['x-ratelimit-remaining-minute']));
        this.kentaaApi.setRemainingRequestThisHour(Number(res.headers['x-ratelimit-remaining-hour']));
        //console.log(`Remaining requests this minute: ${this.kentaaApi.remainingRequestThisMinute} / this hour: ${this.kentaaApi.remainingRequestThisHour}`)
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