module.exports = (sequelize, DataTypes) => {
  const urls = sequelize.define('urls', {
    tiny_url: DataTypes.STRING,
    long_url: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return urls;
};
