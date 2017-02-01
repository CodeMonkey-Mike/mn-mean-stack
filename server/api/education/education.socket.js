/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Education = require('./education.model');

exports.register = function(socket) {
  Education.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Education.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('education:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('education:remove', doc);
}