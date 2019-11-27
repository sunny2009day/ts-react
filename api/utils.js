module.exports = {
  md5(value) {
    require('crypto').createHash('md5').update(value).digest('hex');
  }
}