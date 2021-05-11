var RequestOptions = require("../request-options");
var APILocation = require("./api-location");

module.exports = class Performances extends APILocation {
  constructor(kentaaApi, parentLocation)
  {
    super(kentaaApi, parentLocation, "performances", "performances");
  }

  /** Returns entire list of Performances. See https://developer.kentaa.nl/kentaa-api/#list-performances
   * @param {Object} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Array} - The requested list of Performances.
   */
  list(queryParameters)
  {
    return this.getEntirePaginatedList(queryParameters)
  }

  /** Returns a Performance. See https://developer.kentaa.nl/kentaa-api/#get-a-performance
   * 
   * @param {*} id - The id {Number} of the desired Performance.
   * @returns {Object} - The requested Performance.
   */
  get(id)
  {
    let requestOptions = new RequestOptions("GET", `${this.apiLocation}/${id}`);
    return this.doRequest(requestOptions);
  }

  /**
   * Create a Performance. See https://developer.kentaa.nl/kentaa-api/#create-a-performance
   * @param {string} title - The title of the performance.
   * @param {string} performance_type - The type of the performance (running, walking, biking, swimming, ice_skating, roller_skating or other).
   * @param {Date} performance_at - The time (Date object) of the performance.
   * @param {string} distance - The distance of the performance (with decimals). Will be converted to km when unit is m.
   * @param {Object} bodyParameters - optional parameters in the POST body (as a {key: value} dictionary) to add to the request.
   */
  create(title, performance_type, performance_at, distance, bodyParameters)
  {
    let body = bodyParameters;
    if (typeof body === 'undefined' && !body) body = {};
    body.title = title;
    body.performance_type = performance_type;
    body.performance_at = performance_at;
    body.distance = distance;
    let requestOptions = new RequestOptions("POST", this.apiLocation, null, body);
    return this.doRequest(requestOptions);
  }

  /**
   * Update a Performance. See https://developer.kentaa.nl/kentaa-api/#update-a-performance
   * @param {Number} performance_id - Id of the Performance to be updated.
   * @param {Object} bodyParameters - optional parameters in the PATCH body (as a {key: value} dictionary) to add to the request.
   */
  update(performance_id, bodyParameters)
  {
    let body = bodyParameters;
    if (typeof body === 'undefined' && !body) body = {};
    let requestOptions = new RequestOptions("PATCH", `${this.apiLocation}/${performance_id}`, null, body);
    return this.doRequest(requestOptions);
  }

  /** Delete a Performance. See https://developer.kentaa.nl/kentaa-api/#delete-a-performance
   * 
   * @param {*} id - The id {Number} of the Performance to be deleted.
   * @returns {Object} - On succes: status 204 with an empty body.
   */
  delete(id)
  {
    let requestOptions = new RequestOptions("DELETE", `${this.apiLocation}/${id}`);
    return this.doRequest(requestOptions);
  }

}