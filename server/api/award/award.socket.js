/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Award = require('./award.model');

exports.register = function(socket) {
  Award.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Award.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('award:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('award:remove', doc);
}