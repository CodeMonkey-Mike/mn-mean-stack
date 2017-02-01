'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var Service = require('./service.model');

// Get list of services
exports.index = function(req, res) {
  Service.find(function (err, services) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(services);
  });
};

// Get a single service
exports.show = function(req, res) {
  Service.findById(req.params.id, function (err, service) {
    if(err) { return handleError(res, err); }
    if(!service) { return res.status(404).send('Not Found'); }
    return res.json(service);
  });
};

// Creates a new service in the DB.
exports.create = function(req, res) {
  var uploadPath  = path.normalize(process.cwd() + '/client/assets/images/uploads/');

  // Decoding the base64 image
  var imageBuffer = new Buffer(req.body.image.base64, 'base64');

  // In case the '/uploads' directoy doesn't exist
  if( !fs.existsSync(uploadPath) ) {
    fs.mkdirSync(uploadPath);
  }

  fs.writeFile(uploadPath + req.body.image.filename, imageBuffer, function(err) {
    Service.create({name: req.body.name, image: req.body.image.filename}, function(err, service) {
      if(err) { return handleError(res, err); }
      return res.status(201).json(service);
    });
  });
};

// Updates an existing service in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Service.findById(req.params.id, function (err, service) {
    if (err) { return handleError(res, err); }
    if(!service) { return res.status(404).send('Not Found'); }
    var updated = _.merge(service, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(service);
    });
  });
};

// Deletes a service from the DB.
exports.destroy = function(req, res) {
  Service.findById(req.params.id, function (err, service) {
    if(err) { return handleError(res, err); }
    if(!service) { return res.status(404).send('Not Found'); }
    service.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
