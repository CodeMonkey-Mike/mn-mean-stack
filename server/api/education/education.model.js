'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EducationSchema = new Schema({
  degree: String,
  startYear: Number,
  startMonth: Number,
  endYear: Number,
  endMonth: Number,
  school: String,
  location: String,
  description: String
});

module.exports = mongoose.model('Education', EducationSchema);
