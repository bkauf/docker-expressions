var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {

  var name = req.query.name;
//  var espData = fs.readFileSync("/expressions/"+name).toString();
/* delete */
  console.log(name+ " Delete")

  fs.unlinkSync("/expressions/"+name);

        res.send('Deleted <a href="/">Home</a>');

});

module.exports = router;
