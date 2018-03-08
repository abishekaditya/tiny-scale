const Server = require('../src/server');
const Models = require('../models');

describe('Testing the Hapi server that returns tiny url on passing long url', () => {
  beforeEach((done) => {
    Models.urls.create({
      long_url: 'http://test.me',
      tiny_url: 'ghijkl',
    }).then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.urls.destroy({
      truncate: true,
    }).then(() => {
      done();
    });
  });
  test('Should return a long url for an existing entry in the database', (done) => {
    const request = {
      method: 'GET',
      url: '/getLongUrl?tinyUrl=ghijkl',
    };
    Server.inject(request, (response) => {
      expect(response.result.long_url).toBe('http://test.me');
      done();
    });
  });
  test('Should return an error for non existing url', (done) => {
    const request = {
      method: 'GET',
      url: '/getLongUrl?tinyUrl=000000',
    };
    Server.inject(request, (response) => {
      expect(response.result).toEqual({
        statusCode: 404,
        tinyUrl: '',
        longUrl: '',
        uniqueString: '',
        error: 'Invalid input url',
      });
      done();
    });
  });
});
