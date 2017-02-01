'use strict';

var _ = require('lodash');
var Experience = require('./experience.model');

// Get list of experiences
exports.index = function(req, res) {
  Experience.find(function (err, experiences) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(experiences);
  });
};

// Get a single experience
exports.show = function(req, res) {
  Experience.findById(req.params.id, function (err, experience) {
    if(err) { return handleError(res, err); }
    if(!experience) { return res.status(404).send('Not Found'); }
    return res.json(experience);
  });
};

// Creates a new experience in the DB.
exports.create = function(req, res) {
  Experience.create(req.body, function(err, experience) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(experience);
  });
};

// Updates an existing experience in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Experience.findById(req.params.id, function (err, experience) {
    if (err) { return handleError(res, err); }
    if(!experience) { return res.status(404).send('Not Found'); }
    var updated = _.merge(experience, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(experience);
    });
  });
};

// Deletes a experience from the DB.
exports.destroy = function(req, res) {
  Experience.findById(req.params.id, function (err, experience) {
    if(err) { return handleError(res, err); }
    if(!experience) { return res.status(404).send('Not Found'); }
    experience.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}