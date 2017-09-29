var express = require('express');
var router = express.Router();
var os = require("os");
var hostname = os.hostname();
var fs = require('fs');
var files = [];


/* GET home page. */
router.get('/', function(req, res, next) {

    const path = '/expressions';
  //const path = '.';
  var files = [];

  /*  if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(file => {
        var obj = {
          name: file
        };
        files.push(obj);
      })
    }
*/


    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(file => {
        if(file!=".DS_Store"){
              directory = file;
                fs.readdirSync(path+'/'+directory).forEach(file2 => {

                  var obj = {
                    name: file2,
                    type: directory
                  };
                    if(file2!=".DS_Store" && file2!=".js"){
                        files.push(obj);
                      }
          })
        }
    })
  }






  res.render('index', { title: 'Docker Expressions', container: hostname, exp:files });
});

module.exports = router;
