// content of index.js
const http = require('http')
const port = 8080

/* Mail Config */
var nodemailer = require('nodemailer');
var request = require("request");
var cheerio = require("cheerio");

fs = require('fs');
var sys   = require('sys');
var exec  = require('child_process').exec;
var spawn = require('child_process').spawn;
var cmd   = spawn('docker', ['events', '--format', "{{json .}}@@"]);
var counter = 0;
cmd.stdout.on('data', function(data) {
    counter ++;
    dataStr = data.toString();

    try {
     dataFeed =dataStr.split("@@");


         for (var i = 0, len = dataFeed.length; i < len-1; i++){

           dataObj = JSON.parse(dataFeed[i]);
           if (dataObj["Type"]){
             /* Able to parse events, add action code below */


              try { // Run code from expression here

                  switch(dataObj["Type"]){
                      case "container":
                            console.log("container event");
                            container = dataObj;
                            // read file contents
                            dirName = '/expressions/container';

                            fs.readdir(dirName, function(err, files) {
                                if (err) return;
                                files.forEach(function(f) {
                                    console.log('Firing: ' + f);
                                    fs.readFile(dirName+"/"+f, 'utf8', function (err,data) {
                                      if (err) {
                                        return console.log(err);
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


                            break;
                      case "service":
                            console.log("service event ");
                            service = dataObj;
                            // read file contents
                            dirName = 'expressions/service';

                            fs.readdir(dirName, function(err, files) {
                                if (err) return;
                                files.forEach(function(f) {
                                    console.log('Files: ' + f);
                                    fs.readFile(dirName+"/"+f, 'utf8', function (err,data) {
                                      if (err) {
                                        return console.log(err);
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

                            break;
                      default:
                        console.log(dataObj["Type"]);
                        break;

                  }


              }

              catch(err) {
                console.log(err);
                console.log("Error: "+ dataStr);
              }


            /* action code above */
             }

         }

    }
    catch(err) {
      console.log(err);
      console.log("Error: "+ dataStr);
    }


});




const requestHandler = (request, response) => {
  console.log(request.url)
  response.end("Docker Expressions")

}


const server = http.createServer(requestHandler);
server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
