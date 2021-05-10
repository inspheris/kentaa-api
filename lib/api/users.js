var RequestOptions = require("../request-options");
var APILocation = require("./api-location");

module.exports = class Users extends APILocation {
  constructor(kentaaApi, parentLocation)
  {
    super(kentaaApi, parentLocation, "users", "users");
  }

  /** Returns entire list of Users. See https://developer.kentaa.nl/kentaa-api/?shell#list-users
   * @param {Object} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Array} - The requested list of Users.
   */
  list(queryParameters)
  {
    return this.getEntirePaginatedList(queryParameters)
  }

  /** Returns an User. See https://developer.kentaa.nl/kentaa-api/?shell#get-an-user
   * 
   * @param {*} id - The id {Number} of the desired User.
   * @returns {Object} - The requested User.
   */
  get(id)
  {
    let requestOptions = new RequestOptions("GET", `${this.apiLocation}/${id}`);
    return this.doRequest(requestOptions);
  }

  /**
   * Create an User. See https://developer.kentaa.nl/kentaa-api/?shell#create-an-user
   * @param {string} email - The email address of the user.
   * @param {string} first_name - The first name of the user.
   * @param {string} last_name - The last name of the user.
   * @param {Object} bodyParameters - optional parameters in the POST body (as a {key: value} dictionary) to add to the request.
   */
  create(email, first_name, last_name, bodyParameters)
  {
    let body = bodyParameters;
    if (typeof body === 'undefined' && !body) body = {};
    body.email = email;
    body.first_name = first_name;
    body.last_name = last_name;
    let requestOptions = new RequestOptions("POST", this.apiLocation, null, body);
    return this.doRequest(requestOptions);
  }

  /**
   * Update an User. See https://developer.kentaa.nl/kentaa-api/?shell#update-an-user
   * @param {Number} user_id - Id of the User to be updated.
   * @param {Object} bodyParameters - optional parameters in the PATCH body (as a {key: value} dictionary) to add to the request.
   */
  update(user_id, bodyParameters)
  {
    let body = bodyParameters;
    if (typeof body === 'undefined' && !body) body = {};
    let requestOptions = new RequestOptions("PATCH", `${this.apiLocation}/${user_id}`, null, body);
    return this.doRequest(requestOptions);
  }

  /**
   * Authenticate an user by using email address and password. All users returned from the List Users endpoint can be authenticated, with the exception of users that have OTP enabled.
   * @param {string} email 
   * @param {string} password 
   */
  authenticate(email, password)
  {
    let body = {};
    body.email = email;
    body.password = password;
    let requestOptions = new RequestOptions("POST", `${this.apiLocation}/auth`, null, body);
    return this.doRequest(requestOptions);
  }

}