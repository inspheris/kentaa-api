var RequestOptions = require("../request-options");
var APILocation = require("./api-location");

module.exports = class ManualDonations extends APILocation {
  constructor(kentaaApi, parentLocation)
  {
    super(kentaaApi, parentLocation, "manual-donations", "manual_donations");
  }

  /** Returns entire list of Manual Donations. See https://developer.kentaa.nl/kentaa-api/?shell#list-manual-donations
   * @param {Object} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Array} - The requested list of Manual Donations.
   */
  async list(queryParameters)
  {
    return await this.kentaaApi.getEntirePaginatedList(this.apiLocation, this.returnedListName, queryParameters);
  }

  /** Returns a Manual Donation. See https://developer.kentaa.nl/kentaa-api/?shell#get-a-manual-donation
   * 
   * @param {*} id - The id {Number} of the desired Manual Donation.
   * @returns {Object} - The requested Manual Donation.
   */
  async get(id)
  {
    let requestOptions = new RequestOptions("GET", `${this.apiLocation}/${id}`);
    return await this.kentaaApi.doRequest(requestOptions);
  }

  /**
   * Create a Manual Donation on SITE LEVEL. See https://developer.kentaa.nl/kentaa-api/?shell#create-a-manual-donation
   * @param {string} first_name - The first name of the donator.
   * @param {string} last_name - The last name of the donator.
   * @param {string} amount - The manual donation amount (with decimals).
   * @param {Object} bodyParameters - optional parameters in the POST body (as a {key: value} dictionary) to add to the request.
   */
  async create(first_name, last_name, amount, bodyParameters)
  {
    let body = bodyParameters;
    if (typeof body === 'undefined' && !body) body = {};
    body.first_name = first_name;
    body.last_name = last_name;
    body.amount = amount;
    let requestOptions = new RequestOptions("POST", this.apiLocation, null, body);
    return await this.kentaaApi.doRequest(requestOptions);
  }

  /**
   * Update a Manual Donation. See https://developer.kentaa.nl/kentaa-api/?shell#update-a-manual-donation
   * @param {Number} manual_donation_id - Id of the Manual Donation to be updated.
   * @param {Object} bodyParameters - optional parameters in the PATCH body (as a {key: value} dictionary) to add to the request.
   */
  async update(manual_donation_id, bodyParameters)
  {
    let body = bodyParameters;
    if (typeof body === 'undefined' && !body) body = {};
    let requestOptions = new RequestOptions("PATCH", `${this.apiLocation}/${manual_donation_id}`, null, body);
    return await this.kentaaApi.doRequest(requestOptions);
  }

  /** Delete a Manual Donation. See https://developer.kentaa.nl/kentaa-api/?shell#delete-a-manual-donation
   * 
   * @param {*} id - The id {Number} of the Manual Donation to be deleted.
   * @returns {Object} - On succes: status 204 with an empty body.
   */
     async delete(id)
     {
       let requestOptions = new RequestOptions("DELETE", `${this.apiLocation}/${id}`);
       return await this.kentaaApi.doRequest(requestOptions);
     }

}