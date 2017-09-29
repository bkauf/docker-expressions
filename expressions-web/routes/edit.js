var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {

  var name = req.query.name;
//  var espData = fs.readFileSync("/expressions/"+name).toString();
 fs.readFile("/expressions/"+name, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
    expParts=name.split('/');
    expName = expParts[1].split(".js");

    res.render('edit', { title: 'Docker Expressions', espName: expName[0],espType: expParts[0], espCode:data });
  });


//  res.render('expressions', { title: 'Docker Expressions', espName: name, espBody:espData });
});

module.exports = router;
