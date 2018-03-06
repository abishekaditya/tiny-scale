const Models = require('../../models');

module.exports = [{
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
    }
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
  },
}];
