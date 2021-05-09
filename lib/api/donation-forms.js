var RequestOptions = require("../request-options");
var APILocation = require("./api-location");

module.exports = class DonationForms extends APILocation{
  constructor(kentaaApi)
  {
    super(kentaaApi, null, "donation-forms", "donation_forms");
  }

  /** Get a list of donation forms for the current site. See https://developer.kentaa.nl/kentaa-api/?shell#list-donation-forms
   * @param {Object} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Array} - The requested list of Donation Forms.
   */
  async list(queryParameters)
  {
    return await this.kentaaApi.getEntirePaginatedList(this.apiLocation, this.returnedListName, queryParameters);
  }

  /** Returns a Donation Form. See https://developer.kentaa.nl/kentaa-api/?shell#get-a-donation-form
   * 
   * @param {*} id - The id {Number} or slug {string} of the desired Donation Form.
   * @param {*} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Object} - The requested Donation Form.
   */
  async get(id, queryParameters)
  {
    let requestOptions = new RequestOptions("GET", `${this.apiLocation}/${id}`, queryParameters);
    return await this.kentaaApi.doRequest(requestOptions);
  }

}