var RequestOptions = require("../request-options");

module.exports = class Actions {
  constructor(kentaaApi)
  {
    this.kentaaApi = kentaaApi;
  }

  /** Returns entire list of Actions. See https://developer.kentaa.nl/kentaa-api/#list-actions
   * @param {Object} [optionalParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Array} - The requested list of Actions.
   */
  async list(optionalParameters)
  {
    return await this.kentaaApi.getEntirePaginatedList("actions", "actions", optionalParameters);
  }

  /** Returns an Action. See https://developer.kentaa.nl/kentaa-api/#get-an-action
   * 
   * @param {*} id - The id {Number} or slug {string} of the desired Action.
   * @param {*} [optionalParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Object} - The requested Action.
   */
  async get(id, optionalParameters)
  {
    let requestOptions = new RequestOptions("GET", `actions/${id}`, optionalParameters);
    return await this.kentaaApi.doRequest(requestOptions);
  }

  /**
   * Create an Action on SITE LEVEL. See https://developer.kentaa.nl/kentaa-api/?shell#create-an-action
   * @param {Number} owner_id - Owner identifier for this action.
   * @param {string} title - Title for the action.
   * @param {string} description - Description for the action.
   * @param {Object} optionalBodyParameters - optional parameters in the POST body (as a {key: value} dictionary) to add to the request.
   */
  async create(owner_id, title, description, optionalBodyParameters)
  {
    let body = optionalBodyParameters;
    if (typeof body === 'undefined' && !body) body = {};
    body.owner_id = owner_id;
    body.title = title;
    body.description = description;
    let requestOptions = new RequestOptions("POST", "actions", null, body);
    return await this.kentaaApi.doRequest(requestOptions);
  }

}