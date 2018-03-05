const getTinyUrl = require('./getTinyUrl');
const getLongUrl = require('./getLongUrl');
const slash = require('./slash');
const ping = require('./ping');


module.exports = [].concat(getTinyUrl, getLongUrl, slash, ping);
