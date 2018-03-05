module.exports = (sequelize, DataTypes) => {
  const urls = sequelize.define('urls', {
    tiny_url: DataTypes.STRING(6),
    long_url: DataTypes.STRING,
  }, {});
  urls.createObject = (tinyUrl, longUrl) => urls.findOrCreate({
    where: { tiny_url: tinyUrl },
    default: {
      long_url: longUrl,
    },
  });
  return urls;
};
