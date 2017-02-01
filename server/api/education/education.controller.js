'use strict';

var _ = require('lodash');
var Education = require('./education.model');

// Get list of educations
exports.index = function(req, res) {
  Education.find(function (err, educations) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(educations);
  });
};

// Get a single education
exports.show = function(req, res) {
  Education.findById(req.params.id, function (err, education) {
    if(err) { return handleError(res, err); }
    if(!education) { return res.status(404).send('Not Found'); }
    return res.json(education);
  });
};

// Creates a new education in the DB.
exports.create = function(req, res) {
  Education.create(req.body, function(err, education) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(education);
  });
};

// Updates an existing education in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Education.findById(req.params.id, function (err, education) {
    if (err) { return handleError(res, err); }
    if(!education) { return res.status(404).send('Not Found'); }
    var updated = _.merge(education, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(education);
    });
  });
};

// Deletes a education from the DB.
exports.destroy = function(req, res) {
  Education.findById(req.params.id, function (err, education) {
    if(err) { return handleError(res, err); }
    if(!education) { return res.status(404).send('Not Found'); }
    education.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}