const Hapi = require('hapi');
const Good = require('good');
const Redis = require('redis');
const Routes = require('./routes');

const server = new Hapi.Server();

server.connection({
  port: 8080,
  host: 'localhost',
});

const redisClient = Redis.createClient();

server.route(Routes(redisClient));

server.register([
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
  server.start((error) => {
    if (!error) {
      console.log('Server started');
    } else {
      console.log(error);
    }
  });
});

module.exports = server;
