const generateHash = require('../../src/helpers/generateUrlHash');

describe('Testing the helper function that returns tiny url on passing long url', () => {
  test('Should return a string of length 6', () => {
    expect(generateHash('http://abc.xyz', 0, 6).length === 6);
  });
  test('Should return unique strings of each url', () => {
    const tempLongUrlOne = 'http://abc.xyz';
    const tempLongUrlTwo = 'http://xyz.abc';
    expect(generateHash(tempLongUrlOne, 0, 6) !== generateHash(tempLongUrlTwo, 0, 6)).toBe(true);
  });
});
