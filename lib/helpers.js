// helper functions

async function waitAsync(ms){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
  
// this function calculates the milliseconds until the next whole hour. For resetting the api rate limit.
function msToNextHour() {
  return 3600000 - new Date().getTime() % 3600000;
}

// this function calculates the milliseconds until the next whole minute. For resetting the api rate limit.
function msToNextMinute() {
  return 60000 - new Date().getTime() % 60000;
}

async function waitUntilNextMinute(){
  // wait until the next whole minute. add 5 seconds for timing issues.
  await waitAsync(msToNextMinute() + 5000);
  return
}

async function waitUntilNextHour(){
  // wait until the next whole hour. add 5 seconds for timing issues.
  await waitAsync(msToNextHour() + 5000);
  return
}

function editIdOfApi(id, api)
{
  for (let subApi of Object.values(api))
  {
    subApi.setParentId(id);
  }
}

exports.waitAsync = waitAsync;
exports.waitUntilNextMinute = waitUntilNextMinute;
exports.waitUntilNextHour = waitUntilNextHour;
exports.editIdOfApi = editIdOfApi;