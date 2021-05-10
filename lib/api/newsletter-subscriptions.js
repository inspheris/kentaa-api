var RequestOptions = require("../request-options");
var APILocation = require("./api-location");

module.exports = class NewsletterSubscriptions extends APILocation {
  constructor(kentaaApi, parentLocation)
  {
    super(kentaaApi, parentLocation, "newsletter-subscriptions", "newsletter_subscriptions");
  }

  /** Returns entire list of Newsletter Subscriptions. See https://developer.kentaa.nl/kentaa-api/?shell#list-newsletter-subscriptions
   * @param {Object} [queryParameters] - optional URL parameters (as a {key: value} dictionary) to add to the request.
   * @returns {Array} - The requested list of Newsletter Subscriptions.
   */
  list(queryParameters)
  {
    return this.getEntirePaginatedList(queryParameters);
  }

  /** Returns a Newsletter Subscription. See https://developer.kentaa.nl/kentaa-api/?shell#get-a-newsletter-subscription
   * 
   * @param {*} id - The id {Number} of the desired Newsletter Subscription.
   * @returns {Object} - The requested Newsletter Subscription.
   */
  get(id)
  {
    let requestOptions = new RequestOptions("GET", `${this.apiLocation}/${id}`);
    return this.doRequest(requestOptions);
  }

}