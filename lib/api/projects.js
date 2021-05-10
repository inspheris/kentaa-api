var RequestOptions = require("../request-options");
var APILocation = require("./api-location");

module.exports = class Projects extends APILocation {
  constructor(kentaaApi, parentLocation)
  {
    super(kentaaApi, parentLocation, "projects", "projects");
  }

  /** Returns entire list of Projects. See https://developer.kentaa.nl/kentaa-api/?shell#list-projects
   * @param {Object} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Array} - The requested list of Projects.
   */
  list(queryParameters)
  {
    return this.getEntirePaginatedList(queryParameters);
  }

  /** Returns a Project. See https://developer.kentaa.nl/kentaa-api/?shell#get-a-project
   * 
   * @param {*} id - The id {Number} of the desired Project.
   * @returns {Object} - The requested Project.
   */
  get(id)
  {
    let requestOptions = new RequestOptions("GET", `${this.apiLocation}/${id}`);
    return this.doRequest(requestOptions);
  }

}