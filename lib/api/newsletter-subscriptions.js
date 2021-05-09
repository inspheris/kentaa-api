var RequestOptions = require("../request-options");
var APILocation = require("./api-location");

module.exports = class NewsletterSubscriptions extends APILocation {
  constructor(kentaaApi, parentLocation)
  {
    super(kentaaApi, parentLocation, "newsletter-subscriptions", "newsletter_subscriptions");
  }

  /** Returns entire list of Newsletter Subscriptions on the ENTIRE SITE. See https://developer.kentaa.nl/kentaa-api/?shell#list-newsletter-subscriptions
   * @param {Object} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Array} - The requested list of Newsletter Subscriptions.
   */
  async list(queryParameters)
  {
    return await this.kentaaApi.getEntirePaginatedList(this.apiLocation, this.returnedListName, queryParameters);
  }

  /** Returns a Newsletter Subscription. See https://developer.kentaa.nl/kentaa-api/?shell#get-a-newsletter-subscription
   * 
   * @param {*} id - The id {Number} of the desired Newsletter Subscription.
   * @returns {Object} - The requested Newsletter Subscription.
   */
  async get(id)
  {
    let requestOptions = new RequestOptions("GET", `${this.apiLocation}/${id}`);
    return await this.kentaaApi.doRequest(requestOptions);
  }

}