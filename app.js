require("dotenv").config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var responseRender = require('./middleware/responseRender')
var serverErrors =  require('./constant/errors')
var bodyParser = require("body-parser")
var cors = require("cors")
var indexRouter = require('./routes/index');
var psyRouter = require('./routes/psy');
var patientRouter = require("./routes/patient") 
var adminRouter = require("./routes/admin") 

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
// cors options
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use('/', indexRouter);
app.use('/', psyRouter);
app.use('/', patientRouter);
app.use('/', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json(responseRender({}, serverErrors.ROUTE_NOT_FOUND, ""));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    res.status(500).json(responseRender({}, serverErrors.SERVER_ERROR, ""))
  });
module.exports = app;
