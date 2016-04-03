var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  token: String
});

module.exports = mongoose.model('Token', schema);
