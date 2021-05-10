# kentaa-api
A Node.js library for communicating with the Kentaa API.

## Installation
```
npm install kentaa-api
```

## Usage
Import the KentaaApi class. Create a KentaaApi object with your API Key.
```javascript
const KentaaApi = require('kentaa-api');
var ka = new KentaaApi('[your api key]');
```

..or extend the KentaaApi Class:
```javascript
var KentaaApi = require('kentaa-api');

const API_KEY = "[your api key]";

module.exports = class MyKentaaApi extends KentaaApi {

  constructor() {
    // create an kentaa-api object with our API key
    super(API_KEY);
  }
}
```

When calling a method in this library, you will receive a Promise object (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

The Promise will be resolved once the response from the Kentaa API is received. In case of a paginated list, the Promise is resolved once all pages have been received and all results are concatenated into one list.

Also, when you exceed your API rate limit during the request, this API library will automatically queue the request until the API rate limit has been reset. The Promise will be resolved as soon as the API rate limit has been reset.

You can implement handling the Promise with Promise.then(), but in the examples below we will only show async/await implementations.

## Benefits

* This library will keep an eye on your API rate limits. Fire your requests and wait for the Promise to resolve.
* Automatic conversion between ISO 8601 date strings in UTC (as specified by the API) to a Date object in your local time.


### Actions
https://developer.kentaa.nl/kentaa-api/?shell#actions
```javascript
const KentaaApi = require('kentaa-api');
var ka = new KentaaApi('[your api key]');

async actionsDemo()
{
  // list all Actions on entire site
  let actions = await ka.actions.list();

  // list all Actions after 1st of January 2021
  let params = {
    "created_after": new Date(2021, 0, 1)
  }
  let actions = await ka.actions.list(params);

  // list all Actions for specific Project
  let actions = await ka.project([project_id]).actions.list();

  // list all Actions for specific Segment
  let actions = await ka.segment([project_id]).actions.list();
  
  // get specific Action by ID
  let action = await ka.actions.get([action_id]);
  
  // create Action. See https://developer.kentaa.nl/kentaa-api/?shell#create-an-action for available bodyParameters.
  let optionalBodyParamters = {
    'target_amount': 100,
    'active': true
  }
  let newAction = await ka.actions.create([owner_id], '[title]', '[description]', optionalBodyParameters);

  // update Action. See https://developer.kentaa.nl/kentaa-api/?shell#update-an-action for available parameters.
  let parametersToEdit = {
    'description': "Updated description",
    'target_amount': 1000
  }
  let updatedAction = await ka.actions.update([action_id], parametersToEdit)
}
```

### Donation Forms
https://developer.kentaa.nl/kentaa-api/?shell#donation-forms
```javascript
const KentaaApi = require('kentaa-api');
var ka = new KentaaApi('[your api key]');

async donationFormsDemo()
{
  // list all Donation Forms on entire site
  let donationForms = await ka.donationForms.list();
  
  // get specific Donation Form by ID
  let donationForm = await ka.donationForms.get([donation_form_id]);
}
```

### Donations
https://developer.kentaa.nl/kentaa-api/?shell#donations
```javascript
const KentaaApi = require('kentaa-api');
var ka = new KentaaApi('[your api key]');

async donationsDemo()
{
  // list all Donations on entire site
  let donations = await ka.donations.list();

  // list all Donations for a specific Donation Form
  let donations = await ka.donationForm([donation_form_id]).donations.list();

  // list all Donations for a specific Recurring Donor
  let donations = await ka.recurringDonor([recurring_donor_id]).donations.list();

  // list all Donations for a specific Segment
  let donations = await ka.segment([segment_id]).donations.list();

  // list all Donations for a specific Project
  let donations = await ka.project([project_id]).donations.list();

  // list all Donations for a specific Team
  let donations = await ka.team([team_id]).donations.list();

  // list all Donations for a specific Action
  let donations = await ka.action([action_id]).donations.list();
  
  // get specific Donation by ID
  let donation = await ka.donations.get([donation_id]);
}
```

### Manual Donations
https://developer.kentaa.nl/kentaa-api/?shell#manual-donations
```javascript
const KentaaApi = require('kentaa-api');
var ka = new KentaaApi('[your api key]');

async manualDonationsDemo()
{
  // list all Manual Donations on entire site
  let manualDonations = await ka.manualDonations.list();

  // list all Manual Donations for specific Donation Form
  let manualDonations = await ka.donationForm([donation_form_id]).manualDonations.list();

  // list all Manual Donations for specific Segment
  let manualDonations = await ka.segment([segment_id]).manualDonations.list();

  // list all Manual Donations for specific Project
  let manualDonations = await ka.project([project_id]).manualDonations.list();

  // list all Manual Donations for specific Team
  let manualDonations = await ka.team([team_id]).manualDonations.list();

  // list all Manual Donations for specific Action
  let manualDonations = await ka.action([action_id]).manualDonations.list();
  
  // get specific Manual Donation by ID
  let manualDonation = await ka.manualDonations.get([manual_donation_id]);
  
  // create Manual Donation. See https://developer.kentaa.nl/kentaa-api/?shell#create-a-manual-donation for available bodyParameters.
  let optionalBodyParamters = {
    'anonymous': true
  }
  let newManualDonation = await ka.manualDonations.create('[first_name]', '[lastname]', '[amount]', optionalBodyParameters);

  // update Manual Donation. See https://developer.kentaa.nl/kentaa-api/?shell#update-a-manual-donation for available parameters.
  let parametersToEdit = {
    'amount': "100.00",
  }
  let updatedManualDonation = await ka.manualDonations.update([manual_donation_id], parametersToEdit)

  // delete Manual Donation
  let deleteResponse = await ka.manualDonations.delete([manual_donation_id]);
}
```

### Newsletter Subscriptions
https://developer.kentaa.nl/kentaa-api/?shell#newsletter-subscriptions
```javascript
const KentaaApi = require('kentaa-api');
var ka = new KentaaApi('[your api key]');

async newsletterSubscriptionsDemo()
{
  // list all Newsletter Subscriptions on entire site
  let newsletterSubscriptions = await ka.newsletterSubscriptions.list();

  // list all Newsletter Subscriptions for specific Donation Form
  let newsletterSubscriptions = await ka.donationForm([donation_form_id]).list();

  // list all Newsletter Subscriptions for specific Segment
  let newsletterSubscriptions = await ka.segment([segment_id]).list();

  // list all Newsletter Subscriptions for specific Project
  let newsletterSubscriptions = await ka.project([project_id]).list();
  
  // get specific Newsletter Subscription by ID
  let newsletterSubscription = await ka.newsletterSubscriptions.get([newsletter_subscription_id]);
}
```

### Projects
https://developer.kentaa.nl/kentaa-api/#projects
```javascript
const KentaaApi = require('kentaa-api');
var ka = new KentaaApi('[your api key]');

async projectsDemo()
{
  // list all Projects on entire site
  let projects = await ka.projects.list();

  // list all Projects for specific Segment
  let projects = await ka.segment([segment_id]).projects.list();

  // get specific Project by ID
  let project = await ka.projects.get([project_id]);
}
```

### Recurring donors
https://developer.kentaa.nl/kentaa-api/#recurring-donors
```javascript
const KentaaApi = require('kentaa-api');
var ka = new KentaaApi('[your api key]');

async recurringDonorsDemo()
{
  // list all Recurring Donors on entire site
  let recurringDonors = await ka.recurringDonors.list();

  // list all Recurring Donors for specific Donation Form
  let recurringDonors = await ka.donationForm([recurring_donor_id]).recurringDonors.list();

  // get specific Recurring Donor by ID
  let recurringDonor = await ka.recurringDonors.get([recurring_donor_id]);
}
```

### Segments
https://developer.kentaa.nl/kentaa-api/#segments
```javascript
const KentaaApi = require('kentaa-api');
var ka = new KentaaApi('[your api key]');

async segmentsDemo()
{
  // list all Segments on entire site
  let segments = await ka.segments.list();

  // get specific Segment by ID
  let segment = await ka.segments.get([segment_id]);
}
```

### Sites
https://developer.kentaa.nl/kentaa-api/#sites
```javascript
const KentaaApi = require('kentaa-api');
var ka = new KentaaApi('[your api key]');

async sitesDemo()
{
  // get current Site
  let site = await ka.sites.get();
}
```

### Teams
https://developer.kentaa.nl/kentaa-api/#teams
```javascript
const KentaaApi = require('kentaa-api');
var ka = new KentaaApi('[your api key]');

async teamsDemo()
{
  // list all Teams on entire site
  let teams = await ka.teams.list();

  // list all Teams for specific Segment
  let teams = await ka.segment([segment_id]).teams.list();

  // list all Teams for specific Project
  let teams = await ka.project([project_id]).teams.list();

  // get specific Team by ID
  let team = await ka.teams.get([team_id]);
}
```

### Users
https://developer.kentaa.nl/kentaa-api/#users
```javascript
const KentaaApi = require('kentaa-api');
var ka = new KentaaApi('[your api key]');

async usersDemo()
{
  // list all Users on entire site
  let users = await ka.users.list();

  // get specific Users by ID
  let user = await ka.users.get([user_id]);
  
  // create User. See https://developer.kentaa.nl/kentaa-api/#create-an-user for available bodyParameters.
  let optionalBodyParamters = {
    'street': "Streetname",
  }
  let newUser = await ka.users.create('[email]', '[first_name]', '[last_name]', optionalBodyParameters);

  // update User. See https://developer.kentaa.nl/kentaa-api/#update-an-user for available parameters.
  let parametersToEdit = {
    'first_name': "Updated firstname",
    'last_name': "Updated lastname"
  }
  let updatedUser = await ka.users.update([user_id], parametersToEdit)

  // authenticate User
  let authenticatedUser = await ka.users.authenticate("[email]", "[password]")
}
```

# Contributing
Feel free to send me a PR or bug report at https://github.com/scrKevin/kentaa-api/issues