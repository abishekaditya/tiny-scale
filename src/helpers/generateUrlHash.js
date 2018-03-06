const md5 = require('md5');

module.exports = (longUrl, startIndex, length) => {
  const tempTinyUrl = md5(longUrl);
  return tempTinyUrl.substring(startIndex, startIndex + length);
};

