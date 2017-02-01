'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TestimonialSchema = new Schema({
  name: String,
  company: String,
  quote: String
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
