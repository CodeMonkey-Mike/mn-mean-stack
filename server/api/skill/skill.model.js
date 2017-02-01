'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SkillSchema = new Schema({
  name: String,
  strength: Number
});

module.exports = mongoose.model('Skill', SkillSchema);
