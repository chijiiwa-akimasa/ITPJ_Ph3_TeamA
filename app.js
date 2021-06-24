var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jmkotsuhiRouter = require('./routes/jmkotsuhi');
var jmkotsuhi2Router = require('./routes/jmkotsuhi2');
var jmkotsuhi3Router = require('./routes/jmkotsuhi3');
var jmkotsuhi4Router = require('./routes/jmkotsuhi4')
var jmkehiRouter = require('./routes/jmkehi');
var jmkehi4Router = require('./routes/jmkehi4');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jmkotsuhi', jmkotsuhiRouter);
app.use('/jmkotsuhi2', jmkotsuhi2Router);
app.use('/jmkotsuhi3', jmkotsuhi3Router);
app.use('/jmkotsuhi4', jmkotsuhi4Router);
app.use('/jmkehi', jmkehiRouter);
app.use('/jmkehi4', jmkehi4Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
