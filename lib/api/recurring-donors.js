var RequestOptions = require("../request-options");
var APILocation = require("./api-location");

module.exports = class RecurringDonors extends APILocation {
  constructor(kentaaApi, parentLocation)
  {
    super(kentaaApi, parentLocation, "recurring-donors", "recurring_donors");
  }

  /** Returns entire list of Recurring Donors. See https://developer.kentaa.nl/kentaa-api/#list-recurring-donors
   * @param {Object} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Array} - The requested list of Recurring Donors.
   */
  list(queryParameters)
  {
    return this.getEntirePaginatedList(queryParameters)
  }

  /** Returns a Recurring Donor. See https://developer.kentaa.nl/kentaa-api/#get-a-recurring-donor
   * 
   * @param {*} id - The id {Number} of the desired Recurring Donor.
   * @returns {Object} - The requested Recurring Donor.
   */
  get(id)
  {
    let requestOptions = new RequestOptions("GET", `${this.apiLocation}/${id}`);
    return this.doRequest(requestOptions);
  }

}