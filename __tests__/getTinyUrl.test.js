const Server = require('../src/server');
const Models = require('../models');

describe('Testing the Hapi server that returns tiny url on passing long url', () => {
  afterAll((done) => {
    Models.urls.destroy({
      truncate: true,
    }).then(() => {
      done();
    });
  });
  test('Should return a string of length 6 for appending to the url', (done) => {
    const request = {
      method: 'POST',
      url: '/getTinyUrl',
      payload: {
        longUrl: 'http://testpage.com/abc/def/xyz/pqr',
      },
    };
    Server.inject(request, (response) => {
      expect(response.result.uniqueString.length).toBe(6);
      done();
    });
  });
  test('Should return an error for empty long url', (done) => {
    const request = {
      method: 'POST',
      url: '/getTinyUrl',
      payload: {
        longUrl: '',
      },
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
  test('Should return an object with tiny url, unique string and long url on a valid request', (done) => {
    const request = {
      method: 'POST',
      url: '/getTinyUrl',
      payload: {
        longUrl: 'http://testpage.com/abc/def/xyz/pqr',
      },
    };
    Server.inject(request, (response) => {
      expect(response.result.tinyUrl).toBe(`http://tiny.url/${response.result.uniqueString}`);
      expect(response.result.error).toBe('');
      done();
    });
  });
});
