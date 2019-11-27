let mongoose = require('mongoose');

let {url} = require('./setting.js');

let conn = mongoose.createConnection(url, {useUnifiedTopology: true, useNewUrlParser: true});

let UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  avatar: String,
  phone: String
});

let User =  conn.model('User', UserSchema);

module.exports = {
  User
};