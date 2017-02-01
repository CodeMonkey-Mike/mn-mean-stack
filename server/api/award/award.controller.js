'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var Award = require('./award.model');

// Get list of awards
exports.index = function(req, res) {
  Award.find(function (err, awards) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(awards);
  });
};

// Get a single award
exports.show = function(req, res) {
  Award.findById(req.params.id, function (err, award) {
    if(err) { return handleError(res, err); }
    if(!award) { return res.status(404).send('Not Found'); }
    return res.json(award);
  });
};

// Creates a new award in the DB.
exports.create = function(req, res) {
  var uploadPath  = path.normalize(process.cwd() + '/client/assets/images/uploads/');

  // Decoding the base64 image
  var imageBuffer = new Buffer(req.body.image.base64, 'base64');

  // In case the '/uploads' directoy doesn't exist
  if( !fs.existsSync(uploadPath) ) {
    fs.mkdirSync(uploadPath);
  }

  fs.writeFile(uploadPath + req.body.image.filename, imageBuffer, function(err) {
    Award.create({
      title: req.body.title,
      company: req.body.company,
      awardMonth: req.body.awardMonth,
      awardYear: req.body.awardYear,
      image: req.body.image.filename}, function(err, award) {
      if(err) { return handleError(res, err); }
      return res.status(201).json(award);
    });
  });
};

// Updates an existing award in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Award.findById(req.params.id, function (err, award) {
    if (err) { return handleError(res, err); }
    if(!award) { return res.status(404).send('Not Found'); }
    var updated = _.merge(award, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(award);
    });
  });
};

// Deletes a award from the DB.
exports.destroy = function(req, res) {
  Award.findById(req.params.id, function (err, award) {
    if(err) { return handleError(res, err); }
    if(!award) { return res.status(404).send('Not Found'); }
    award.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
