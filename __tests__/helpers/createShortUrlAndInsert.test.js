const Sinon = require('sinon');
const Models = require('../../models');
const createShortUrlAndInsert = require('../../src/helpers/createShortUrlAndInsert');
const generateUrlHash = require('../../src/helpers/generateUrlHash');

describe('Testing the function that tries to insert a unique tiny url hash to the database', () => {
  beforeEach((done) => {
    Models.urls.truncate().then(() => {
      done();
    });
  });
  test('Should create a new URL entry for no conflicting entries in the DB', (done) => {
    createShortUrlAndInsert('Test string').then((result) => {
      Models.urls.findAll({
        where: {
          tiny_url: result.tinyUrl,
        },
      }).then((searchResult) => {
        expect(searchResult.length).toBe(1);
        done();
      });
    });
  });
  test('Should create a new URL entry for conflicting entries in the DB', (done) => {
    const testUrlOne = 'http://test.me';
    const testUrlTwo = 'http://test.you';
    const stub = Sinon.stub(generateUrlHash, 'md5');
    stub.withArgs(testUrlOne, 0, 6).returns('abcdef');
    stub.withArgs(testUrlTwo, 0, 6).returns('abcdef');
    stub.withArgs(testUrlTwo, 1, 6).returns('ghijkl');
    createShortUrlAndInsert(testUrlOne).then(() => {
      createShortUrlAndInsert(testUrlTwo).then((newResult) => {
        expect(newResult.tinyUrl).toBe('ghijkl');
        Models.urls.findAll({
          where: {
            tiny_url: newResult.tinyUrl,
          },
        }).then((searchResult) => {
          expect(searchResult.length).toBe(1);
          stub.restore();
          done();
        });
      });
    });
  });
});
