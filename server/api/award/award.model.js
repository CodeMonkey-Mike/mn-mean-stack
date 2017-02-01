'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AwardSchema = new Schema({
  title: String,
  company: String,
  image: String,
  awardYear: Number,
  awardMonth: Number
});

module.exports = mongoose.model('Award', AwardSchema);
