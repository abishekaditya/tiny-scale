const Models = require('../../models');

beforeEach(() => {
  Models.urls.create({
    tiny_url: 'abcdef',
    long_url: 'http://test.url',
  });
});
describe('Testing the class function to create or update in urls model', () => {
  test('Should return one tiny url for existing entry', (done) => {
    Models.urls.createObject('abcdef', 'http://test.url').then((url) => {
      expect(url.tiny_url).toBe('abcdef');
      expect(url.long_url).toBe('http://test.url');
      //   expect(created).toBe(false);
      done();
    });
  });
  test('Should return one tiny url for new entry', (done) => {


  });
});
