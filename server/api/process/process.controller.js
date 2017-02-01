'use strict';

var _ = require('lodash');
var Process = require('./process.model');

// Get list of processs
exports.index = function(req, res) {
  Process.find(function (err, processs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(processs);
  });
};

// Get a single process
exports.show = function(req, res) {
  Process.findById(req.params.id, function (err, process) {
    if(err) { return handleError(res, err); }
    if(!process) { return res.status(404).send('Not Found'); }
    return res.json(process);
  });
};

// Creates a new process in the DB.
exports.create = function(req, res) {
  Process.create(req.body, function(err, process) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(process);
  });
};

// Updates an existing process in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Process.findById(req.params.id, function (err, process) {
    if (err) { return handleError(res, err); }
    if(!process) { return res.status(404).send('Not Found'); }
    var updated = _.merge(process, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(process);
    });
  });
};

// Deletes a process from the DB.
exports.destroy = function(req, res) {
  Process.findById(req.params.id, function (err, process) {
    if(err) { return handleError(res, err); }
    if(!process) { return res.status(404).send('Not Found'); }
    process.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}