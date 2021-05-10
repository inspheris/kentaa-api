var RequestOptions = require("../request-options");
var APILocation = require("./api-location");

module.exports = class Donations extends APILocation {
  constructor(kentaaApi, parentLocation)
  {
    super(kentaaApi, parentLocation, "donations", "donations");
  }

  /** Returns entire list of Donations on the ENTIRE SITE. See https://developer.kentaa.nl/kentaa-api/?shell#list-donations
   * @param {Object} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Array} - The requested list of Donations.
   */
  list(queryParameters)
  {
    return this.getEntirePaginatedList(queryParameters);
  }

  /** Returns a Donation. See https://developer.kentaa.nl/kentaa-api/?shell#get-a-donation
   * 
   * @param {*} id - The id {Number} of the desired Donation.
   * @returns {Object} - The requested Donation.
   */
  get(id)
  {
    let requestOptions = new RequestOptions("GET", `${this.apiLocation}/${id}`, {});
    return this.doRequest(requestOptions);
  }

}