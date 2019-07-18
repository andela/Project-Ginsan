/**
 * Module dependencies.
 */
var express = require('express')

var fs = require('fs')
const logger = require('morgan')

var passport = require('passport')

var io = require('socket.io')

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const path = require('path')
var config = require('./config/config')

var auth = require('./config/middlewares/authorization')

var mongoose = require('mongoose')

// Bootstrap db connection
// config.db currently points to MONGOHQ_URL which is undefined
// mongoose.connect(config.db)
const spinTestDb = require('./config/testDb')

spinTestDb().then(
  db => {
    mongoose.connect(db.location, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error('Error connecting to db ', err)
      }
    })
  }
)

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

// express settings

// Bootstrap routes
const bodyParser = require('body-parser')
app.use(bodyParser())
app.use(logger('dev'))
require('./config/routes')(app, passport, auth)
require('./config/express')(app, passport, mongoose)
// Start the app by listening on <port>
var port = config.port
var server = app.listen(port)
var ioObj = io.listen(server, { log: false })
// game logic handled here
require('./config/socket/socket')(ioObj)
console.log('Express app started on port ' + port)

// Initializing logger

// expose app
exports = module.exports = app
