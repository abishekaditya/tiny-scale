const Models = require('../../models');
const generateUrlHash = require('../helpers/generateUrlHash');

const tryInsert = (longUrl, tinyUrl) => Models.urls.createObject(tinyUrl, longUrl).then((urlInsertResponse) => {
  if (urlInsertResponse[1] === true) {
    return true;
  } else if (urlInsertResponse[0].long_url === longUrl) {
    return true;
  }
  return false;
});

module.exports = [{
  method: 'POST',
  path: '/getTinyUrl',
  handler: (request, response) => {
    const { longUrl } = request.payload;
    if (longUrl.length <= 0) {
      response({
        statusCode: 404,
        tinyUrl: '',
        longUrl: '',
        uniqueString: '',
        error: 'Invalid input url',
      });
    } else {
      let startIndex = 0;
      const length = 6;
      let isUniqueReturned = false;
      while (!isUniqueReturned) {
        const urlHash = generateUrlHash(longUrl, startIndex, length);
        const insertResponse = tryInsert(longUrl, urlHash);
        if (insertResponse) {
          isUniqueReturned = true;
          response({
            statusCode: 201,
            tinyUrl: `http://tiny.url/${urlHash}`,
            longUrl,
            uniqueString: urlHash,
            error: '',
          });
        } else {
          startIndex += length;
        }
      }
    }
  },
}];
