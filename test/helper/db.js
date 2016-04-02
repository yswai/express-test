var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/my-express-db-test');
var User = require('./../../models/user');
var Subscription = require('./../../models/subscription');

console.log(`Seeding user test data...`);
User.create({
    name: 'YSW',
    username: 'YSW',
    password: '1234',
    admin: true,
    location: 'Pro\'s Bed',
    meta: {
      age: 30,
      website: 'yswtest.neocities.org'
    },
    created_at: new Date(),
    updated_at: new Date()
});
