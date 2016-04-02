var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().exec().then((data) => {
    res.json(data);
  }, (error) => {
    res.json({
      error: error
    });
  });
});

module.exports = router;
