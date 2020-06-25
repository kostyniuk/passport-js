const mongoose = require('mongoose');
const connection = require('../config/db');

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  provider: String,
  providerId: String,
  fullName: String,
  email: String,
  picture: String,
});

module.exports = connection.model('UserGoogle', UserSchema);
