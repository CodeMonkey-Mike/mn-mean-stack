/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Testimonial = require('./testimonial.model');

exports.register = function(socket) {
  Testimonial.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Testimonial.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('testimonial:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('testimonial:remove', doc);
}