const crypto = require('crypto');

module.exports = {
  md5: (longUrl, startIndex, length) => {
    const tempTinyUrl = crypto.createHash('md5').update(longUrl).digest('base64').replace(/\//g, '_');
    console.log(tempTinyUrl);
    return tempTinyUrl.substring(startIndex, startIndex + length);
  },
};
