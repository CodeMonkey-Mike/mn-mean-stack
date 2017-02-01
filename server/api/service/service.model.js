'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ServiceSchema = new Schema({
  name: String,
  image: String
});

module.exports = mongoose.model('Service', ServiceSchema);
