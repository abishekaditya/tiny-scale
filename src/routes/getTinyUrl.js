const createShortUrlAndInsert = require('../helpers/createShortUrlAndInsert');

module.exports = redisClient => [{
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
      const url = createShortUrlAndInsert(longUrl);
      url.then((createResponse) => {
        if (createResponse.created) {
          redisClient.hset('urls', createResponse.tinyUrl, createResponse.longUrl);
        }
        response({
          statusCode: 201,
          tinyUrl: `http://tiny.url/${createResponse.tinyUrl}`,
          longUrl: createResponse.longUrl,
          uniqueString: createResponse.tinyUrl,
          error: '',
        });
      });
    }
  },
}];
