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
  async list(queryParameters)
  {
    return await this.kentaaApi.getEntirePaginatedList(this.apiLocation, this.returnedListName, queryParameters);
  }

  /** Returns a Project. See https://developer.kentaa.nl/kentaa-api/?shell#get-a-project
   * 
   * @param {*} id - The id {Number} of the desired Project.
   * @returns {Object} - The requested Project.
   */
  async get(id)
  {
    let requestOptions = new RequestOptions("GET", `${this.apiLocation}/${id}`);
    return await this.kentaaApi.doRequest(requestOptions);
  }

}