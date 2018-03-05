const Server = require('../src/server');
const Routes = require('../src/routes');

describe('Testing the Hapi server that processes the requests', () => {
  test('Should contain correct number of routes', () => {
    expect(Routes.length).toBe(Server.table('localhost')[0].table.length);
  });
  test('Should return 200 status code for sucessful GET request', (done) => {
    const request = {
      method: 'GET',
      url: '/',
    };
    Server.inject(request, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('Should return pong for sucessful GET request to /ping', (done) => {
    const request = {
      method: 'GET',
      url: '/ping',
    };
    Server.inject(request, (response) => {
      expect(response.result).toBe('pong');
      done();
    });
  });
});
