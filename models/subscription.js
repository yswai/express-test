var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subscriptionSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
