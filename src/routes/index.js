const getTinyUrl = require('./getTinyUrl');
const getLongUrl = require('./getLongUrl');
const slash = require('./slash');
const ping = require('./ping');


module.exports = redisClient => [].concat(
  getTinyUrl(redisClient),
  getLongUrl(redisClient),
  slash,
  ping,
);
