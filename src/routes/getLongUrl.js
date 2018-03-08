const Models = require('../../models');

module.exports = [{
  method: 'GET',
  path: '/getLongUrl',
  handler: (request, response) => {
    const requestUrl = request.query.tinyUrl;
    const redisClient = request.server.plugins['hapi-redis'].client;
    if (requestUrl.length !== 6) {
      response({
        statusCode: 404,
        tinyUrl: '',
        longUrl: '',
        uniqueString: '',
        error: 'Invalid input url',
      });
    } else {
      redisClient.hget('urls', requestUrl, (error, redisResult) => {
        if (redisResult === null) {
          Models.urls.findOne({
            where: {
              tiny_url: requestUrl,
            },
          }).then((urlEntry) => {
            if (urlEntry !== null) {
              response({
                long_url: urlEntry.long_url,
              });
            } else {
              response({
                statusCode: 404,
                tinyUrl: '',
                longUrl: '',
                uniqueString: '',
                error: 'Invalid input url',
              });
            }
          });
        } else {
          response({
            long_url: redisResult,
          });
        }
      });
    }
  },
}];
