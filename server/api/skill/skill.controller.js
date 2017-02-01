'use strict';

var _ = require('lodash');
var Skill = require('./skill.model');

// Get list of skills
exports.index = function(req, res) {
  Skill.find(function (err, skills) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(skills);
  });
};

// Get a single skill
exports.show = function(req, res) {
  Skill.findById(req.params.id, function (err, skill) {
    if(err) { return handleError(res, err); }
    if(!skill) { return res.status(404).send('Not Found'); }
    return res.json(skill);
  });
};

// Creates a new skill in the DB.
exports.create = function(req, res) {
  Skill.create(req.body, function(err, skill) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(skill);
  });
};

// Updates an existing skill in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Skill.findById(req.params.id, function (err, skill) {
    if (err) { return handleError(res, err); }
    if(!skill) { return res.status(404).send('Not Found'); }
    var updated = _.merge(skill, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(skill);
    });
  });
};

// Deletes a skill from the DB.
exports.destroy = function(req, res) {
  Skill.findById(req.params.id, function (err, skill) {
    if(err) { return handleError(res, err); }
    if(!skill) { return res.status(404).send('Not Found'); }
    skill.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}