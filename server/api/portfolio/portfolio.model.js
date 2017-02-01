'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PortfolioSchema = new Schema({
  client: String,
  description: String,
  logo: String,
  category: String,
  type: String,
  year: Number,
  slideImages: [String],
  website: String,
  detail: String,
  facebook: String,
  twitter: String,
  pinterest: String,
  linkedin: String,
  googleplus: String
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
