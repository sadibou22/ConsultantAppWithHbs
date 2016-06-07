var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var bodyParser = require('body-parser');
var Model = require('./Models/Consultant-Model.js');
var fileUpload = require('express-fileupload');
var port= 3000;


var routeIndex = require('./routes/index');
var routeConsultants = require('./routes/consultants');

var app = express();

// view engine setup, ou ce trouve mes vues
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(fileUpload);
app.use(fileUpload());
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.bodyParser());
app.use(bodyParser({ keepExtensions: true, uploadDir:'./files'}));

//connection mongoose
Model.connect();


//Mes get et post gerés par le midelwaire route
app.use('/', routeIndex);
app.use('/consultants', routeConsultants);
app.use('/', routeConsultants);



app.listen(port);
console.log('Application running on http://localhost:'+port);

