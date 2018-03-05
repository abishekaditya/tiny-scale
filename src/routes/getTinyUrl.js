module.exports = [{
  method: 'POST',
  path: '/getTinyUrl',
  handler: (request, response) => {
    response('PONG');
  },
}];
