const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  username: {
    type: String,
    min: 3,
    max: 30,
    required: true,
    unique: true
  },
  passwordHashAndSalt: {
    type: String,
    required: true
  },
  name: {
    type: String
  }
});

const User = mongoose.model('User', userschema);

module.exports = User;
