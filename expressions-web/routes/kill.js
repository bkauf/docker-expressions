var express = require('express');
var router = express.Router();

/* GET  listing. */
router.get('/', function(req, res, next) {
  res.send('Kill environment variable set!');
  global.health = "bad";
});

module.exports = router;
