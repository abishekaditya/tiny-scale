module.exports = [{
  method: 'GET',
  path: '/getLongUrl',
  handler: (request, response) => {
    response('PONG');
  },
}];
