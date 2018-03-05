const md5 = require('md5');

const testUrls = [];
const localHash = new Set();

const returnUniqueHash = (longUrl) => {
  const tempTinyUrl = md5(longUrl);
  let startIndex = 0;
  let endIndex = 6;
  console.log('----------');
  while (localHash.has(tempTinyUrl.slice(startIndex, endIndex))) {
    console.log(tempTinyUrl.slice(startIndex, endIndex));
    startIndex += 6;
    endIndex += 6;
  }
  localHash.add(tempTinyUrl.slice(startIndex, endIndex));
  return tempTinyUrl.slice(startIndex, endIndex);
};

const createTestUrls = () => {
  for (let i = 0; i < 1000000; i += 1) {
    const longUrl = `https://return-url-param.herokuapp.com/${i}`;
    const tinyUrl = returnUniqueHash(longUrl);
    testUrls.push({
      tiny_url: tinyUrl,
      long_url: longUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    createTestUrls();
    localHash.clear();
    return queryInterface.bulkInsert('urls', testUrls, {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('urls', null, {});
  },
};
