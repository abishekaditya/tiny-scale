const Hapi = require('hapi');
const Routes = require('./routes');

const server = new Hapi.Server();

server.connection({
  port: 8080,
  host: 'localhost',
});

server.route(Routes);

if (!module.parent) {
  server.start((error) => {
    if (!error) {
      console.log('Server started');
    }
  });
}

module.exports = server;
