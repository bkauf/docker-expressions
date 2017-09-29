var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var health = require('./routes/health');
var kill = require('./routes/kill');
var edit = require('./routes/edit');
var delr = require('./routes/delr');
var fs = require('fs');



var app = express();
// test
//# view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/edit', edit);
app.use('/health', health);
app.use('/kill', kill);
app.use('/delr', delr);

app.post('/save',function(req,res){
  var esp_name=req.body.espName;
  var esp_code=req.body.espCode;
  var esp_type=req.body.espType;

  console.log(req.body);

  fs.writeFile("/expressions/"+esp_type+"/"+esp_name+".js", esp_code, function(err) {
      if(err) {
          res.send(err);
      }
        res.send('Saved <a href="/">Home</a>');
  });

});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
