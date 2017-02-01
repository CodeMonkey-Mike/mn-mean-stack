'use strict';

var _ = require('lodash');
var Profile = require('./profile.model');

// Get profile
exports.index = function(req, res) {
  Profile.findOne({}, function (err, profile) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(profile);
  });
};

// Update or create profile
exports.update = function(req, res) {
  Profile.findOne({}, function (err, profile) {
    if (err) { return handleError(res, err); }
    console.log(profile);
    if(!profile) {
      Profile.create(req.body, function(err, profile) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(profile);
      });
    } else {
      var updated = _.merge(profile, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(profile);
      });
    }
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
