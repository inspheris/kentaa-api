var RequestOptions = require("../request-options");
var APILocation = require("./api-location");

module.exports = class Segments extends APILocation {
  constructor(kentaaApi, parentLocation)
  {
    super(kentaaApi, parentLocation, "segments", "segments");
  }

  /** Returns entire list of Segments. See https://developer.kentaa.nl/kentaa-api/#list-segments
   * @param {Object} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Array} - The requested list of Segments.
   */
  list(queryParameters)
  {
    return this.getEntirePaginatedList(queryParameters)
  }

  /** Returns a Segment. See https://developer.kentaa.nl/kentaa-api/#get-a-segment
   * 
   * @param {*} id - The id {Number} of the desired Segment.
   * @returns {Object} - The requested Segment.
   */
  get(id)
  {
    let requestOptions = new RequestOptions("GET", `${this.apiLocation}/${id}`);
    return this.doRequest(requestOptions);
  }

}