const Models = require('../../models');

module.exports = (longUrl, tinyUrl) => Models.urls.createObject(tinyUrl, longUrl)
  .then((urlInsertResponse) => {
    if (urlInsertResponse[1] === true) {
      return true;
    } else if (urlInsertResponse[0].dataValues.long_url === longUrl) {
      return true;
    }
    return false;
  });
