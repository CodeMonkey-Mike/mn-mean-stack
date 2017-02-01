/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Experience = require('./experience.model');

exports.register = function(socket) {
  Experience.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Experience.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('experience:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('experience:remove', doc);
}