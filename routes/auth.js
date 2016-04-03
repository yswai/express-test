var jwt = require('jsonwebtoken');
var router = require('express').Router();
var cors = require('cors');
var User = require('mongoose').model('User');
var Token = require('mongoose').model('Token');

var handleLogin = function (req, res, next) {
  var userName = req.body.name;
  if (!userName) throw 'Invalid username';
  var user = User.findOne({ name: userName }).exec()
  .then((user) => {
    if (!user) {
      res.status(403).json({
        message: 'Invalid User'
      });
      return;
    }
    Token.findOne({ name: userName }).exec().then((dbToken) => {
      if (dbToken) {
        res.cookie('token', dbToken.token, { httpOnly: true });
        res.json({
          success: false,
          message: 'Token already exists',
          token: dbToken.token
        });
        return;
      }
      var token = jwt.sign(userName, 'superSecret', {
        expiresInMinutes: 1440 // expires in 24 hours
      });
      Token.create({
        name: userName,
        token: token
      });
      res.cookie('token', token, { httpOnly: true })
      .json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    });
  }).catch((err) => {
    res.status(500).json({
      error: err
    });
  });
}

var handleLogout = function (req, res, next) {
  console.log('logging out');
  res.json({
    message: 'Goodbye!'
  });
}

router
  .post('/authenticate', handleLogin)
  .post('/logout', handleLogout);

module.exports = router;
