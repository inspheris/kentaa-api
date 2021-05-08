module.exports = class RequestOptions {
  constructor(apiLocation, urlParameters) {
    this.requestType = "GET";
    this.apiLocation = apiLocation;
    this.urlParameters = urlParameters;
  }

  get params() {
    let paramString = "";
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
    return paramString;
  }
}