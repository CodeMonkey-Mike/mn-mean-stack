'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var Portfolio = require('./portfolio.model');

// Get list of portfolios
exports.index = function (req, res) {
  Portfolio.find(function (err, portfolios) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(portfolios);
  });
};

// Get a single portfolio
exports.show = function (req, res) {
  Portfolio.findById(req.params.id, function (err, portfolio) {
    if (err) {
      return handleError(res, err);
    }
    if (!portfolio) {
      return res.status(404).send('Not Found');
    }
    return res.json(portfolio);
  });
};

// Creates a new portfolio in the DB.
exports.create = function (req, res) {
  var uploadPath = path.normalize(process.cwd() + '/client/assets/images/uploads/');

  // Decoding the base64 image
  var imageBuffer = new Buffer(req.body.logo.base64, 'base64');

  // In case the '/uploads' directoy doesn't exist
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }

  // save logo
  fs.writeFileSync(uploadPath + req.body.logo.filename, imageBuffer);

  // save slideshow images
  var slideImages = [];
  req.body.slideImages.forEach(function (slideImage) {
    imageBuffer = new Buffer(slideImage.base64, 'base64');
    fs.writeFileSync(uploadPath + slideImage.filename, imageBuffer);
    slideImages.push(slideImage.filename);
  });

  Portfolio.create({
    client: req.body.client,
    description: req.body.description,
    logo: req.body.logo.filename,
    category: req.body.category,
    type: req.body.type,
    year: req.body.year,
    slideImages: slideImages,
    website: req.body.website,
    detail: req.body.detail,
    facebook: req.body.facebook,
    twitter: req.body.twitter,
    pinterest: req.body.pinterest,
    linkedin: req.body.linkedin,
    googleplus: req.body.googleplus
  }, function (err, portfolio) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(portfolio);
  });
};

// Updates an existing portfolio in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Portfolio.findById(req.params.id, function (err, portfolio) {
    if (err) {
      return handleError(res, err);
    }
    if (!portfolio) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(portfolio, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(portfolio);
    });
  });
};

// Deletes a portfolio from the DB.
exports.destroy = function (req, res) {
  Portfolio.findById(req.params.id, function (err, portfolio) {
    if (err) {
      return handleError(res, err);
    }
    if (!portfolio) {
      return res.status(404).send('Not Found');
    }
    portfolio.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
