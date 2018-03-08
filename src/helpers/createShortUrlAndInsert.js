const Models = require('../../models');
const generateUrlHash = require('../helpers/generateUrlHash');

const recursiveInsert = (longUrl, startIndex, length) => {
  const urlHash = generateUrlHash.md5(longUrl, startIndex, length);
  console.log(urlHash);
  return Models.urls.createObject(urlHash, longUrl)
    .spread((createdObject, created) => {
      if ((!created) && (createdObject.long_url !== longUrl)) {
        return recursiveInsert(longUrl, startIndex + 1, length);
      }
      return { longUrl: createdObject.long_url, tinyUrl: createdObject.tiny_url, created };
    });
};

module.exports = (longUrl) => {
  const startIndex = 0;
  const length = 6;
  const insertResult = recursiveInsert(longUrl, startIndex, length);
  return insertResult.then(result => result);
};

