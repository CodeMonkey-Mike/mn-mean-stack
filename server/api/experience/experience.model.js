'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExperienceSchema = new Schema({
  company: String,
  title: String,
  startYear: Number,
  startMonth: Number,
  endYear: Number,
  endMonth: Number,
  current: Boolean,
  website: String,
  description: String
});

module.exports = mongoose.model('Experience', ExperienceSchema);
