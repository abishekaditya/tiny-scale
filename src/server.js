const Hapi = require('hapi');
const Good = require('good');
const HapiRedis = require('hapi-redis');
const Routes = require('./routes');

const server = new Hapi.Server();

server.connection({
  port: 8080,
  host: 'localhost',
});

server.route(Routes);

server.register([
  {
    register: HapiRedis,
    options: {
      connection: {
        host: 'localhost',
        opts: {
          parser: 'javascript',
        },
      },
    },
  },
  {
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
  }], () => {
  if (!module.parent) {
    server.start((error) => {
      if (!error) {
        console.log('Server started');
      } else {
        console.log(error);
      }
    });
  }
});

module.exports = server;
