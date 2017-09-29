#!/usr/sbin/node
console.log("this is from the cron!");
fs = require('fs');
var nodemailer = require('nodemailer');
var sys   = require('sys');
var exec  = require('child_process').exec;
var spawn = require('child_process').spawn;
var request = require("request");

var dirName = '/expressions/cron';


fs.readdir(dirName, function(err, files) {
    if (err) return;
    files.forEach(function(f) {
      // go through each file in the directory and run!
        console.log("fire: "+f);
        fs.readFile(dirName+"/"+f, 'utf8', function (err,data) {

          if (err) {
            return "read failure"; //console.log(err);
          }
          try{ // execute script in file
              eval(data);
          }
          catch(err) {
            console.log(err);
          }
        });
    });
});
