const helpers = require('./lib/helpers');
const QueuedRequest = require('./lib/queued-request');
const RequestOptions = require('./lib/request-options');

const Actions = require('./lib/api/actions');
const DonationForms = require('./lib/api/donation-forms');
const Donations = require('./lib/api/donations');
const ManualDonations = require('./lib/api/manual-donations');
const NewsletterSubscriptions = require('./lib/api/newsletter-subscriptions');
const Projects = require('./lib/api/projects');
const RecurringDonors = require('./lib/api/recurring-donors');
const Segments = require('./lib/api/segments');
const Sites = require('./lib/api/sites');
const Teams = require('./lib/api/teams');
const Users = require('./lib/api/users');

const REQUEST_LIMIT_PER_MINUTE = 100;
const REQUEST_LIMIT_PER_HOUR = 500;


// Rate limiting
// The number of requests is limited to 100 per minute and 500 per hour per API key. When the rate limit is exceeded, the status code 429 will be returned.

// The following headers are included in the response:

// X-RateLimit-Limit-Hour - the maximum number of requests per hour
// X-RateLimit-Remaining-Hour - number of requests remaining per hour
// X-RateLimit-Limit-Minute - the maximum number of requests per minute
// X-RateLimit-Remaining-Minute - number of requests remaining per minute

// counters are reset on the 0th minute of every hour and the 0th second of every minute

module.exports = class KentaaApi {
  #remainingRequestThisMinute
  #remainingRequestThisHour

  constructor(apiKey) {
    this.apiKey = apiKey;
    this.#remainingRequestThisMinute = REQUEST_LIMIT_PER_MINUTE;
    this.#remainingRequestThisHour = REQUEST_LIMIT_PER_HOUR;
    
    this.actions = new Actions(this);
    this.actionApi = {
      donations: new Donations(this, `actions`),
      manualDonations: new ManualDonations(this, `actions`)
    }
    this.donationForms = new DonationForms(this);
    this.donationFormApi = {
      donations: new Donations(this, `donation-forms`),
      manualDonations: new ManualDonations(this, `donation-forms`),
      newsletterSubscriptions: new NewsletterSubscriptions(this, `donation-forms`),
      recurringDonors: new RecurringDonors(this, `donation-forms`)
    };
    this.donations = new Donations(this);
    this.manualDonations = new ManualDonations(this);
    this.newsletterSubscriptions = new NewsletterSubscriptions(this);
    this.projects = new Projects(this);
    this.projectApi = {
      actions: new Actions(this, `projects`),
      donations: new Donations(this, `projects`),
      manualDonations: new ManualDonations(this, `projects`),
      newsletterSubscriptions: new NewsletterSubscriptions(this, `projects`),
      teams: new Teams(this, `projects`)
    };
    this.recurringDonors = new RecurringDonors(this);
    this.recurringDonorApi = {
      donations: new Donations(this, `recurring-donors`)
    }
    this.segments = new Segments(this);
    this.segmentApi = {
      actions: new Actions(this, `segments`),
      donations: new Donations(this, `segments`),
      manualDonations: new ManualDonations(this, `segments`),
      newsletterSubscriptions: new NewsletterSubscriptions(this, `segments`),
      projects: new Projects(this, `segments`),
      teams: new Teams(this, `segments`)
    }
    this.sites = new Sites(this);
    this.teams = new Teams(this);
    this.teamApi = {
      donations: new Donations(this, `teams`),
      manualDonations: new ManualDonations(this, `teams`),
    }
    this.users = new Users(this);
    

    // queue our requests so we can check if we are not exeeding the api rate limits
    this.queuedRequests = [];

    
    // start the automatic rate limit reset functions. These will run async.
    this.resetRequestsThisMinute();
    this.resetRequestsThisHour();
  }
  
  //methods

  /**
   * Sub-api for a specific Action
   * @param {Number} id The ID of the Action you would like to query.
   * @returns Object with available sub-query's.
   */
   action(id)
   {
     helpers.editIdOfApi(id, this.actionApi);
     return this.actionApi;
   }

  /**
   * Sub-api for a specific Project
   * @param {Number} id The ID of the Project you would like to query.
   * @returns Object with available sub-query's.
   */
  project(id)
  {
    helpers.editIdOfApi(id, this.projectApi);
    return this.projectApi;
  }

  /**
   * Sub-api for a specific Donation Form
   * @param {Number} id The ID of the Donation Form you would like to query.
   * @returns Object with available sub-query's.
   */
  donationForm(id)
  {
    helpers.editIdOfApi(id, this.donationFormApi);
    return this.donationFormApi;
  }

  /**
   * Sub-api for a specific Recurring Donor
   * @param {Number} id The ID of the Recurring Donor you would like to query.
   * @returns Object with available sub-query's.
   */
  recurringDonor(id)
  {
    helpers.editIdOfApi(id, this.recurringDonorApi);
    return this.recurringDonorApi;
  }

  /**
   * Sub-api for a specific Segment
   * @param {Number} id The ID of the Segment you would like to query.
   * @returns Object with available sub-query's.
   */
   segment(id)
   {
     helpers.editIdOfApi(id, this.segmentApi);
     return this.segmentApi;
   }

   /**
   * Sub-api for a specific Team
   * @param {Number} id The ID of the Team you would like to query.
   * @returns Object with available sub-query's.
   */
    team(id)
    {
      helpers.editIdOfApi(id, this.teamApi);
      return this.teamApi;
    }

  // reset the request limit every minute and dequeue requests if there are any in the request queue.
  async resetRequestsThisMinute()
  {
    while (true) // loop forever
    {
      this.#remainingRequestThisMinute = REQUEST_LIMIT_PER_MINUTE;
      // console.log(`Resetting remaining requests this minute: ${this.#remainingRequestThisMinute}`);
      this.dequeueNextRequest();
      await helpers.waitUntilNextMinute();
    }
  }

  // reset the request limit every hour and dequeue requests if there are any in the request queue.
  async resetRequestsThisHour()
  {
    while (true) // loop forever
    {
      this.#remainingRequestThisHour = REQUEST_LIMIT_PER_HOUR;
      // console.log(`Resetting remaining requests this hour: ${this.#remainingRequestThisHour}`);
      this.dequeueNextRequest();
      await helpers.waitUntilNextHour();
    }
  }

  // in the response header coming from the Kentaa api, the remaining requests are given. The queuedrequest object can set the value with these methods.
  setRemainingRequestThisMinute(newValue)
  {
    this.#remainingRequestThisMinute = newValue;
    // console.log(`Remaining requests this minute: ${this.#remainingRequestThisMinute}`)
  }

  setRemainingRequestThisHour(newValue)
  {
    this.#remainingRequestThisHour = newValue;
    // console.log(`Remaining requests this hour: ${this.#remainingRequestThisHour}`)
  }

  // if this method is called, a queued request will be executed if the rate limit is not being exceeded. If no requests are queued, nothing will happen.
  dequeueNextRequest()
  {
    if (this.queuedRequests.length > 0 && this.#remainingRequestThisMinute > 0 && this.#remainingRequestThisHour > 0)
    {
      this.#remainingRequestThisHour--;
      this.#remainingRequestThisMinute--;
      let queuedRequest = this.queuedRequests.shift();
      queuedRequest.dequeue();
    }
  }

  // list operations are paginated to 100 results per page (default is 25). We need to make multiple requests to fill our entire list.
  // this method will check the totalpages, create additional requests accordingly and will resolve to the entire concatenated paginated list.
  
  /** Returns the entire paginated list of specified objects
   * @param {string} apiLocation - The URL location as specified by the Kentaa API docs. ie. 'actions' for Action objects.
   * @param {string} nameOfTargetList - The key name of the target list in the response. ie. 'donation_forms' for Donation forms objects.
   * @param {Object} [optionalParameters] - Optional URL parameters.
   */
  async getEntirePaginatedList(apiLocation, nameOfTargetList, optionalParameters)
  {
    if ( typeof optionalParameters === 'undefined' && !optionalParameters ) optionalParameters = {};
    let resultList = [];
    optionalParameters["per_page"] = 100;
    optionalParameters["page"] = 1;
    let requestOptions = new RequestOptions("GET", apiLocation, { ... optionalParameters});
    let listOfFirstPage = await this.doRequest(requestOptions);
    let totalPages = listOfFirstPage['total_pages'];
    if(totalPages == 1)
    {
      // total pages == 1, so returning the list from the first page will suffice.
      return listOfFirstPage[nameOfTargetList];
    }
    else if (totalPages > 1)
    {
      // total pages > 1, so additional requests will have to be made. The resulting lists per page will be concatenated to the original list.
      resultList = listOfFirstPage[nameOfTargetList];
      for (var page = 2; page <= totalPages; page++)
      {
        optionalParameters["page"] = page;
        let requestOptions = new RequestOptions("GET", apiLocation, { ... optionalParameters});
        let listOfThisPage = await this.doRequest(requestOptions);
        resultList = resultList.concat(listOfThisPage[nameOfTargetList]);
      }
      return resultList;
    }
  }

  // do a  request on the Kentaa api. Returns a promise that will resolve once the response of the request is received.
  // if the api rate limit is exceeded, the promise will be resolved once the rate limits are reset (every minute or every hour).
  
  /** Do a request on the Kentaa API.
   * @param {RequestOptions} requestOptions - The request options object.
   */
  doRequest(requestOptions)
  {
    let queuedRequest = new QueuedRequest(requestOptions, this);
    this.queuedRequests.push(queuedRequest);
    // check if we can execute this new request in the next iteration of the event loop.
    setImmediate(() => {
      this.dequeueNextRequest();
    });

    // return the promise that will be resolved when this request is dequeued.
    return queuedRequest.promise;
  }
}