const md5 = require('md5');
const Models = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/getTinyUrl',
  handler: (request, response) => {
    console.log(request.payload);
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
      const tinyUrl = md5(longUrl).slice(0, 6);
      Models.urls.findCreateFind({
        where: {
          tiny_url: tinyUrl,
        },
        defaults: {
          tiny_url: tinyUrl,
          long_url: longUrl,
        },
      }).then(() => {
        response({
          statusCode: 201,
          tinyUrl: `http://tiny.url/${tinyUrl}`,
          longUrl,
          uniqueString: tinyUrl,
          error: '',
        });
      });
    }
  },
}];
