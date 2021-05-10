var RequestOptions = require("../request-options");
var APILocation = require("./api-location");

module.exports = class Teams extends APILocation {
  constructor(kentaaApi, parentLocation)
  {
    super(kentaaApi, parentLocation, "teams", "teams");
  }

  /** Returns entire list of Teams. See https://developer.kentaa.nl/kentaa-api/?shell#list-teams
   * @param {Object} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Array} - The requested list of Teams.
   */
  list(queryParameters)
  {
    return this.getEntirePaginatedList(queryParameters)
  }

  /** Returns a Team. See https://developer.kentaa.nl/kentaa-api/?shell#get-a-team
   * 
   * @param {*} id - The id {Number} of the desired Team.
   * @param {*} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Object} - The requested Team.
   */
  get(id, queryParameters)
  {
    let requestOptions = new RequestOptions("GET", `${this.apiLocation}/${id}`, queryParameters);
    return this.doRequest(requestOptions);
  }

}