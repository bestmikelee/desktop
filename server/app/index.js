// create app, configurations and api routes
var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    path = require('path'),
    favicon = require('serve-favicon');

// instantiate app
var app = express();

// setValue and getValue are merely alias
// for app.set and app.get used in the less
// common way of setting application variables.  // Taken from FSG
app.setValue = app.set.bind(app);
app.getValue = (mypath) => app.get(mypath);

// Get environmental variables
require('../env')(app);

// Log to console
app.use(logger('dev'));

// Parse cookies
app.use(cookieParser());

// Parse our POST and PUT bodies.
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set view render engine
app.setValue('views', path.join(app.getValue('root'), 'server', 'app', 'views'));
app.setValue('view engine', 'jade');

// Set cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Views cache
app.setValue('view cache', true);

// Set favicon
app.use(favicon(app.getValue('faviconPath')));

// Allowing 'index.html' to access files in the following folders
var oneDay = 1000 * 60 * 60 * 24;
app.use(express.static(path.join(app.getValue('root'), 'node_modules'), {maxAge: oneDay}));
app.use(express.static(path.join(app.getValue('root'), 'public'), {maxAge: oneDay}));
app.use(express.static(path.join(app.getValue('root'), 'browser'), {maxAge: oneDay}));

// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js
require('./configRoutes')(app);

// All data routes will be prefaced with /api
app.use('/api', require('./appRoutes'));

// All get routes that go through the pipeline, past /api, will get the single page layout
app.get('/*', (req, res) => res.render('index'));

module.exports = app;
