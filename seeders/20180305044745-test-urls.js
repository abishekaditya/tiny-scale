const md5 = require('md5');

const testUrls = [];

const createTestUrls = () => {
  for (let i = 0; i < 1000000; i += 1) {
    const longUrl = `https://return-url-param.herokuapp.com/${i}`;
    const tinyUrl = md5(longUrl).slice(0, 6);
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
    return queryInterface.bulkInsert('urls', testUrls, {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('urls', null, {});
  },
};
