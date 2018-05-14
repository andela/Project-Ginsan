/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    passport = require('passport'),
    logger = require('mean-logger'),
    io = require('socket.io');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

//Load configurations
//if test env, load example file
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config/config'),
    auth = require('./config/middlewares/authorization'),
    mongoose = require('mongoose');

//Bootstrap db connection
//var db = mongoose.connect(config.db);

//my own way for mongoose connection
const dbURI = 'mongodb://localhost/andela'
const dbase = mongoose.connection;

//connect to the local database
mongoose.connect(dbURI || process.env.MONGODB_URI);

dbase.on('error', (error) => {
    console.log('database connection error:' + error);
});
dbase.on('disconnected', () => {

});
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason: ', reason);
    // db.close(() => {
    //     console.log('mongoose is disconnected through the app');
    //     process.exit(0);
    // });
});


//Bootstrap models
var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js|coffee)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

//bootstrap passport config
require('./config/passport')(passport);

var app = express();

app.use(function(req, res, next) {
    next();
});

//express settings
require('./config/express')(app, passport, mongoose);

//Bootstrap routes
require('./config/routes')(app, passport, auth);

//Start the app by listening on <port>
var port = config.port;
var server = app.listen(port);
var ioObj = io.listen(server, { log: false });
//game logic handled here
require('./config/socket/socket')(ioObj);
console.log('Express app started on port ' + port);

//Initializing logger
logger.init(app, passport, mongoose);

//expose app
exports = module.exports = app;