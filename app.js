require("module-alias/register")
require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');

// auth
const session = require('express-session')
const passport = require('passport')

require('@config/passport')(passport) // pass passport for configuration

var indexRouter = require('./app/routes/index');
var usersRouter = require('./app/routes/users');
var categoriesRouter = require('./app/routes/categories');

// route with views
const registerRoute = require('@route/auth/register');
const loginRoute = require('@route/auth/login');
const profileRoute = require('@route/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// required for passport
app.use(session({
	secret: 'nodejsdockerstater',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

// route with views
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/profile', profileRoute);

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
