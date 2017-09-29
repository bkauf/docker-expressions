var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET file contents. */
router.get('/', function(req, res, next) {

  fs.writeFile("/expressions/test.js", "Hey there!", function(err) {
      if(err) {
          res.send(err);
      }
        res.send('##!');
  });

});
module.exports = router;
