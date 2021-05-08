var RequestOptions = require("../request-options");

module.exports = class Actions {
  constructor(kentaaApi, parentLocation)
  {
    this.parentLocation = parentLocation;
    if (typeof this.parentLocation === 'undefined'){
      this.parentLocation = "";
    }
    this.kentaaApi = kentaaApi;
    this.ownApiLocation = "actions";
    this.returnedListName = "actions";
  }

  get apiLocation(){
    return `${this.parentLocation}${this.ownApiLocation}`;
  }

  /** Returns entire list of Actions on the ENTIRE SITE. See https://developer.kentaa.nl/kentaa-api/#list-actions
   * @param {Object} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Array} - The requested list of Actions.
   */
  async list(queryParameters)
  {
    return await this.kentaaApi.getEntirePaginatedList(this.apiLocation, this.returnedListName, queryParameters);
  }

  /** Returns an Action. See https://developer.kentaa.nl/kentaa-api/#get-an-action
   * 
   * @param {*} id - The id {Number} or slug {string} of the desired Action.
   * @param {*} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Object} - The requested Action.
   */
  async get(id, queryParameters)
  {
    let requestOptions = new RequestOptions("GET", `${this.apiLocation}/${id}`, queryParameters);
    return await this.kentaaApi.doRequest(requestOptions);
  }

  /**
   * Create an Action on SITE LEVEL. See https://developer.kentaa.nl/kentaa-api/?shell#create-an-action
   * @param {Number} owner_id - Owner identifier for this action.
   * @param {string} title - Title for the action.
   * @param {string} description - Description for the action.
   * @param {Object} bodyParameters - optional parameters in the POST body (as a {key: value} dictionary) to add to the request.
   */
  async create(owner_id, title, description, bodyParameters)
  {
    let body = bodyParameters;
    if (typeof body === 'undefined' && !body) body = {};
    body.owner_id = owner_id;
    body.title = title;
    body.description = description;
    let requestOptions = new RequestOptions("POST", this.apiLocation, null, body);
    return await this.kentaaApi.doRequest(requestOptions);
  }

  /**
   * Update an Action. See https://developer.kentaa.nl/kentaa-api/?shell#update-an-action
   * @param {Number} action_id - Id of the Action to be updated.
   * @param {Object} bodyParameters - optional parameters in the PATCH body (as a {key: value} dictionary) to add to the request.
   */
  async update(action_id, bodyParameters)
  {
    let body = bodyParameters;
    if (typeof body === 'undefined' && !body) body = {};
    let requestOptions = new RequestOptions("PATCH", `${this.apiLocation}/${action_id}`, null, body);
    return await this.kentaaApi.doRequest(requestOptions);
  }

}