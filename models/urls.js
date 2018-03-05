module.exports = (sequelize, DataTypes) => {
  const urls = sequelize.define('urls', {
    tiny_url: DataTypes.STRING(6),
    long_url: DataTypes.STRING,
  }, {});
  urls.createObject = (tinyUrl, longUrl) => urls.findCreateFind({
    where: { tiny_url: tinyUrl },
    defaults: {
      long_url: longUrl,
    },
  });
  return urls;
};
