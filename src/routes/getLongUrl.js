const Models = require('../../models');

module.exports = redisClient => [{
  method: 'GET',
  path: '/getLongUrl',
  handler: (request, response) => {
    const requestUrl = request.query.tinyUrl;
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
          console.log('Response from DB');
          Models.urls.findOne({
            where: {
              tiny_url: requestUrl,
            },
          }).then((urlEntry) => {
            if (urlEntry !== null) {
              redisClient.hset('urls', requestUrl, urlEntry.long_url);
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
