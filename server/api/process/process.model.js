'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProcessSchema = new Schema({
  name: String,
  icon: String,
  order: Number
});

module.exports = mongoose.model('Process', ProcessSchema);
