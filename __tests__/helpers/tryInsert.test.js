const Models = require('../../models');
const tryInsert = require('../../src/helpers/tryInsert');

beforeEach((done) => {
  Models.urls.destroy({
    truncate: true,
  }).then(() => {
    Models.urls.create({
      tiny_url: 'abcde',
      long_url: 'http://try.me',
    }).then(() => {
      done();
    });
  });
});

afterAll((done) => {
  Models.urls.destroy({
    truncate: true,
  }).then(() => {
    done();
  });
});

describe('Testing the function that tries to insert a unique tiny url hash to the database', () => {
  test('Should return false for conflicting entry with different long url', (done) => {
    tryInsert('try.me', 'abcde').then((returnedValue) => {
      console.log(returnedValue);
      expect(returnedValue).toBe(false);
      done();
    });
  });

  test('Should return true for unique entry', (done) => {
    tryInsert('try.me', 'abcfe').then((returnedValue) => {
      console.log(returnedValue);
      expect(returnedValue).toBe(true);
      done();
    });
  });
  test('Should return true for existing entry withe same long url', (done) => {
    tryInsert('http://try.me', 'abcde').then((returnedValue) => {
      console.log(returnedValue);
      expect(returnedValue).toBe(true);
      done();
    });
  });
});
