const mongoose = require('mongoose');
const connection = require('../config/db')

const UserSchema = new mongoose.Schema ({
  username: {type: String, required: true},
  hash: {type: String, required: true},
  salt: {type: String, required: true}
})

module.exports =  connection.model('User', UserSchema);