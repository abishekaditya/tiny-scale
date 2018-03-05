module.exports = [{
  method: 'GET',
  path: '/getTinyUrl',
  handler: (request, response) => {
    response('PONG');
  },
}];
