const BASE_URL = 'https://api.kentaa.nl'
const VERSION = 'v1'
const API_VERSION = '1.0.4'

// params which we may need to convert to iso strings.
const dateParams = [
  "created_after",
  "updated_after",
  "created_before",
  "updated_before",
  "end_date",
  "performance_at"
]

/**
 * A config object for the request to the Kentaa API.
 * @constructor
 * @param {string} httpType - The HTTP type for this request. "GET", "POST", "PATCH" or "DELETE"
 * @param {string} apiLocation - The API URL location for the request.
 * @param {Object} [urlParameters] - Optional url parameters in a {key: value} Object.
 * @param {Object} [body] - Optional body (if POST or PATCH) in a {key: value} Object.
 */
module.exports = class RequestOptions {
  
  constructor(httpType, apiLocation, urlParameters, body) {
    this.httpType = httpType;
    this.apiLocation = apiLocation;
    this.urlParameters = urlParameters;
    this.body = body;
  }

  get params() {
    let paramString = "";
    if (typeof this.urlParameters !== 'undefined' && this.urlParameters)
    {
      if (Object.keys(this.urlParameters).length > 0)
      {
        let firstParam = true;
        for (let [key, value] of Object.entries(this.urlParameters))
        {
          if (dateParams.includes(key))
          {
            // convert date to iso string
            if (Object.prototype.toString.call(value) === '[object Date]'){
              value = value.toISOString();
            }
          }
          (firstParam) ? paramString += "?" : paramString += "&"
          firstParam = false;
          paramString += `${key}=${value}`
        }
      }
    }
    return paramString;
  }

  getRequestParams(apiKey){
    let requestObj = {
      headers: {
        'Accept': "application/json",
        'Content-Type': "application/json",
        'X-Api-Key': apiKey,
        'User-Agent': `Nodejs kentaa-api/#${API_VERSION}`
      },
      uri: `${BASE_URL}/${VERSION}/${this.apiLocation}${this.params}`,
      method: this.httpType
    }
    // add a body if the httpType is POST or PATCH
    if (this.httpType == "POST" || this.httpType == "PATCH")
    {
      if (typeof this.body === 'undefined' || !this.body) this.body = {};
      // convert date objects to ISO strings
      for (let [key, value] of Object.entries(this.body))
      {
        if (dateParams.includes(key))
        {
          // convert date to iso string
          if (Object.prototype.toString.call(value) === '[object Date]'){
            value = value.toISOString();
          }
        }
      }
      requestObj.body = JSON.stringify(this.body);
    }
    //console.log(requestObj);
    return requestObj;
  }
}