const mongoose = require('mongoose');
const connection = require('../config/db');

const UserSchema = mongoose.Schema({
  username: String,
  provider: String,
  providerId: String,
  fullName: String,
  email: String,
  picture: String,
});

connection.model('UserGoogle', UserSchema);
