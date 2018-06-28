var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;
