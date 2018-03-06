const Hapi = require('hapi');
const Good = require('good');
const Routes = require('./routes');

const server = new Hapi.Server();

server.connection({
  port: 8080,
  host: 'localhost',
});

server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*',
        }],
      }, {
        module: 'good-console',
      }, 'stdout'],
    },
  },
}, (err) => {
  if (err) {
    throw err;
  }
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
