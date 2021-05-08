const BASE_URL = 'https://api.kentaa.nl'
const VERSION = 'v1'
const API_VERSION = '1.0.0'


/**
 * A config object for the request to the Kentaa API.
 * @constructor
 * @param {string} httpType - The HTTP type for this request. "GET", "POST" or "PATCH"
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
        for (const [key, value] of Object.entries(this.urlParameters))
        {
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
    if (this.httpType == "POST" || this.httpType == "PATCH")
    {
      if (typeof this.body === 'undefined' && !this.body) this.body = {};
      requestObj.body = JSON.stringify(this.body);
    }
    return requestObj;
  }
}