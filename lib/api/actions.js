var RequestOptions = require("../request-options");

module.exports = class Actions {
  constructor(kentaaApi)
  {
    this.kentaaApi = kentaaApi;
  }

  async list()
  {
    return await this.kentaaApi.getEntirePaginatedList("actions", "actions");
  }

  //https://developer.kentaa.nl/kentaa-api/#get-an-action
  async get(id, includeOwner)
  {
    let urlParams = {}
    if (includeOwner) urlParams['include'] = 'owner';
    let requestOptions = new RequestOptions(`actions/${id}`, urlParams);
    return await this.kentaaApi.doGetRequest(requestOptions);
  }

}