const Server = require('../src/server');
const Routes = require('../src/routes');

describe('Testing the / route of Hapi server', () => {
  test('Should contain correct number of routes', () => {
    expect(Routes().length).toBe(Server.table('localhost')[0].table.length);
  });
  test('Should return welcome', (done) => {
    const request = {
      method: 'GET',
      url: '/',
    };
    Server.inject(request, (response) => {
      expect(response.result).toBe('welcome');
      done();
    });
  });
});
