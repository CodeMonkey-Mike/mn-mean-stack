'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  name: String,
  dob: Date,
  birthPlace: String,
  email: { type: String, lowercase: true },
  phone: String,
  web: String,
  bio: String,
  hobby: String,
  address: String,
  slideImages: [String]
});

module.exports = mongoose.model('Profile', ProfileSchema);
