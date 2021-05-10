var RequestOptions = require("../request-options");
var APILocation = require("./api-location");

module.exports = class Sites extends APILocation {
  constructor(kentaaApi, parentLocation)
  {
    super(kentaaApi, parentLocation, "sites", "sites");
  }

  /** Returns the current site. See https://developer.kentaa.nl/kentaa-api/#get-current-site
   * 
   * @returns {Object} - The current Site.
   */
  get()
  {
    let requestOptions = new RequestOptions("GET", `${this.apiLocation}/current`);
    return this.doRequest(requestOptions);
  }

}