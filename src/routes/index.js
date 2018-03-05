const getTinyUrl = require('./getTinyUrl');
const getLongUrl = require('./getLongUrl');

const pingService = [{
  method: 'GET',
  path: '/',
  handler: (request, response) => {
    response('PONG');
  },
}];


module.exports = [].concat(getTinyUrl, getLongUrl, pingService);
