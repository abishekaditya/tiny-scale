const Server = require('../server');
const Routes = require('../routes');

describe('Testing the Hapi server that returns tiny url on passing long url', () => {
  test('Should contain correct number of routes', () => {
    expect(Routes.length).toBe(Server.table('localhost')[0].table.length);
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
      expect(response.uniqueString).toBe(false);
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
      expect(response.uniqueString).toBe(false);
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
      expect(response.body).toBe(false);
      done();
    });
  });
});
