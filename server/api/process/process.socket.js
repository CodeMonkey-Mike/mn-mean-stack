/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Process = require('./process.model');

exports.register = function(socket) {
  Process.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Process.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('process:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('process:remove', doc);
}