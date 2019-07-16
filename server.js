/**
 * Module dependencies.
 */
var express = require('express')

var fs = require('fs')

var passport = require('passport')

var logger = require('mean-logger')

var io = require('socket.io')

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// if test env, load example file
const path = require('path')
var config = require('./config/config')

var auth = require('./config/middlewares/authorization')

var mongoose = require('mongoose')

// Bootstrap db connection
mongoose.connect(config.db)

// Bootstrap models
var modelsPath = path.join(__dirname, '/app/models')
var walk = function (path) {
  fs.readdirSync(path).forEach(function (file) {
    var newPath = path + '/' + file
    var stat = fs.statSync(newPath)
    if (stat.isFile()) {
      if (/(.*)\.(js|coffee)/.test(file)) {
        require(newPath)
      }
    } else if (stat.isDirectory()) {
      walk(newPath)
    }
  })
}
walk(modelsPath)

// bootstrap passport config
require('./config/passport')(passport)

var app = express()

app.use(function (req, res, next) {
  next()
})

// express settings
require('./config/express')(app, passport, mongoose)

// Bootstrap routes
require('./config/routes')(app, passport, auth)

// Start the app by listening on <port>
var port = config.port
var server = app.listen(port)
var ioObj = io.listen(server, { log: false })
// game logic handled here
require('./config/socket/socket')(ioObj)
console.log('Express app started on port ' + port)

// Initializing logger
logger.init(app, passport, mongoose)

// expose app
exports = module.exports = app
