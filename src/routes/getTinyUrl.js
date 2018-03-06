const generateUrlHash = require('../helpers/generateUrlHash');
const tryInsert = require('../helpers/tryInsert');

const asyncInsert = async (longUrl, urlHash) => {
  const insertResponse = await tryInsert(longUrl, urlHash);
  return insertResponse;
};

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
        const insertResponse = asyncInsert(longUrl, urlHash);
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
