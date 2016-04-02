var cors = require('cors');
var express = require('express');
var _ = require('lodash');
var router = express.Router();
var whitelist = ['http://localhost:3000'];
var corsOptions = {
  origin: function(origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    if (origin && !originIsWhitelisted) callback('origin not alowed');
    callback(null, originIsWhitelisted);
  }
};
var subscriptionsCors = cors(corsOptions);
var collection = [{
  _id: '1',
  name: 'Foo'
}, {
  _id: '2',
  name: 'Bar'
}];

// router.all('*', subscriptionsCors);

router.route('/').get(subscriptionsCors, getHandler);

router.route('/:id')
  //.options(subscriptionsCors)
  .delete(deleteHandler);

router.param('id', function (req, res, next, id) {
  var row = _.find(collection, { _id: id });
  if (!row) {
    res.status(400).json({
      error: `invalid id ${id}`
    });
    return;
  }
  req.row = row;
  next();
});

function getHandler (req, res, next) {
  setTimeout(function () {
    res.json(collection);
  }, 500);
}

function deleteHandler (req, res, next) {
  setTimeout(function () {
    res.json({
      success: true,
      _id: req.row && req.row.id
    })
  }, 700);
}

module.exports = router;
