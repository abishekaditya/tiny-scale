'use strict';
module.exports = (sequelize, DataTypes) => {
  var urls = sequelize.define('urls', {
    tiny_url: DataTypes.STRING,
    long_url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return urls;
};