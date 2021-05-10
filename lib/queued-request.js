var request = require('request');

// JSON.parse() reviver that will parse serialized Date objects back into Date objects.
function dateReviver( key, value ) {

	if ( isSerializedDate( value ) ) {

		return( new Date( value ) );

	}

	// If it's not a date-string, we want to return the value as-is. If we fail to return
	// a value, it will be omitted from the resultant data structure.
	return( value );

}


// I determine if the given value is a string that matches the serialized-date pattern.
function isSerializedDate( value ) {

	// Dates are serialized in TZ format, example: '1981-12-20T04:00:14Z'.
	var datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

	return( isString( value ) && datePattern.test( value ) );

}


// I determine if the given value is a String.
function isString( value ) {

	return( {}.toString.call( value ) === "[object String]" );

}

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
        //resolve with the json body
        this.resolve(JSON.parse(body, dateReviver));
      }
      else {
        this.reject();
      }
      // dequeue the next request if there is one in the queue
      this.kentaaApi.dequeueNextRequest();
    }.bind(this));
  }
}