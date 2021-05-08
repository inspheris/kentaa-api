var RequestOptions = require("../request-options");

module.exports = class Donations {
  constructor(kentaaApi)
  {
    this.kentaaApi = kentaaApi;
    this.apiLocation = "donations";
    this.returnedListName = "donations";
  }

  /** Returns entire list of Donations on the ENTIRE SITE. See https://developer.kentaa.nl/kentaa-api/?shell#list-donations
   * @param {Object} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Array} - The requested list of Donations.
   */
  async list(queryParameters)
  {
    return await this.kentaaApi.getEntirePaginatedList(this.apiLocation, this.returnedListName, queryParameters);
  }

  /** Returns a Donation. See https://developer.kentaa.nl/kentaa-api/?shell#get-a-donation
   * 
   * @param {*} id - The id {Number} of the desired Donation.
   * @returns {Object} - The requested Donation.
   */
  async get(id)
  {
    let requestOptions = new RequestOptions("GET", `${this.apiLocation}/${id}`, {});
    return await this.kentaaApi.doRequest(requestOptions);
  }

}