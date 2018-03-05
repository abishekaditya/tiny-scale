const Models = require('../../models');

beforeEach((done) => {
  Models.urls.destroy({
    truncate: true,
  });
  Models.urls.create({
    tiny_url: 'abcdef',
    long_url: 'http://test.url',
  }).then(() => {
    done();
  });
});
describe('Testing the class function to create or update in urls model', () => {
  test('Should return one tiny url for existing entry', (done) => {
    Models.urls.createObject('abcdef', 'http://test.url').then((url) => {
      expect(url[0].tiny_url).toBe('abcdef');
      expect(url[0].long_url).toBe('http://test.url');
      expect(url[1]).toBe(false);
      done();
    });
  });
  test('Should return one tiny url for new entry', (done) => {
    Models.urls.createObject('abcdpq', 'http://test.url').then((url) => {
      expect(url[0].dataValues.tiny_url).toBe('abcdpq');
      expect(url[0].dataValues.long_url).toBe('http://test.url');
      expect(url[1]).toBe(true);
      done();
    }).catch((error) => {
      console.log('Error', error);
    });
  });
});
