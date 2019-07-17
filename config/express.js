/**
 * Module dependencies.
 */
var helpers = require('view-helpers')
var config = require('./config')

module.exports = function (app, passport, mongoose) {
  app.set('showStackError', true)

  // Setting the fav icon and static folder

  // Set views path, template engine and default layout
  app.set('views', config.root + '/app/views')
  app.set('view engine', 'jade')

  // Enable jsonp
  app.enable('jsonp callback')

  // dynamic helpers
  app.use(helpers(config.app.name))

  // use passport session
  app.use(passport.session())

  // routes should be at the last

  // Assume "not found" in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
  app.use(function (err, req, res, next) {
    // Treat as 404
    if (~err.message.indexOf('not found')) return next()

    // Log it
    console.error(err.stack)

    // Error page
    res.status(500).render('500', {
      error: err.stack
    })
  })

  // Assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    })
  })
}
