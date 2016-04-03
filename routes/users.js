var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Token = mongoose.model('Token');

/* GET users listing. */
router
  .use((req, res, next) => {
    // var token = req.headers['x-access-token'];
    var tokenCookie = req.cookies['token'];
    console.log(`Auth cookie = ${tokenCookie}`);
    if (!tokenCookie) {
      res.status(403).json({
        error: 'Unauthorized'
      });
      return;
    }
    Token.findOne({ token: tokenCookie }).exec().then((token) => {
      if (!token) {
        console.log(`Token not found`);
        res.status(403).json({
          error: 'Invalid Token'
        });
        return;
      }
      console.log(`Token found, forward to next middleware`);
      next();
    })
  })
  .get('/', function(req, res, next) {
    console.log(`Inside user middleware`);
    User.find().exec().then((data) => {
      console.log(`User data = ${data}`);
      res.json(data);
    }, (error) => {
      res.json({
        error: error
      });
    });
  });

module.exports = router;
