/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = mongoose.model('User');
var avatars = require('./avatars').all();
var jwt = require("jsonwebtoken");
var config = require('../../config/config');

/**
 * Auth callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/chooseavatars');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
  if (!req.user) {
    res.redirect('/#!/signin?error=invalid');
  } else {
    res.redirect('/#!/app');
  }
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
  if (!req.user) {
    res.redirect('/#!/signup');
  } else {
    res.redirect('/#!/app');
  }
};

/**
 * Logout
 */
exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
  res.redirect('/');
};

/** 
 * Check avatar - Confirm if the user who logged in via passport
 * already has an avatar. If they don't have one, redirect them
 * to our Choose an Avatar page.
 */
exports.checkAvatar = function(req, res) {
  if (req.user && req.user._id) {
    User.findOne({
      _id: req.user._id
    })
    .exec(function(err, user) {
      if (user.avatar !== undefined) {
        res.redirect('/#!/');
      } else {
        res.redirect('/#!/choose-avatar');
      }
    });
  } else {
    // If user doesn't even exist, redirect to /
    res.redirect('/');
  }

};

/**
 * Create user
 */
exports.create = function(req, res) {
  if (req.body.name && req.body.password && req.body.email) {
    User.findOne({
      email: req.body.email
    }).exec(function(err,existingUser) {
      if (!existingUser) {
        var user = new User(req.body);
        // Switch the user's avatar index to an actual avatar url
        user.avatar = avatars[user.avatar];
        user.provider = 'local';
        user.save(function(err) {
          if (err) {
            return res.render('/#!/signup?error=unknown', {
              errors: err.errors,
              user: user
            });
          }
          req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/#!/');
          });
        });
      } else {
        return res.redirect('/#!/signup?error=existinguser');
      }
    });
  } else {
    return res.redirect('/#!/signup?error=incomplete');
  }
};

/**
 * Assign avatar to user
 */
exports.avatars = function(req, res) {
  // Update the current user's profile to include the avatar choice they've made
  if (req.user && req.user._id && req.body.avatar !== undefined &&
    /\d/.test(req.body.avatar) && avatars[req.body.avatar]) {
    User.findOne({
      _id: req.user._id
    })
    .exec(function(err, user) {
      user.avatar = avatars[req.body.avatar];
      user.save();
    });
  }
  return res.redirect('/#!/app');
};

exports.addDonation = function(req, res) {
  if (req.body && req.user && req.user._id) {
    // Verify that the object contains crowdrise data
    if (req.body.amount && req.body.crowdrise_donation_id && req.body.donor_name) {
      User.findOne({
        _id: req.user._id
      })
      .exec(function(err, user) {
        // Confirm that this object hasn't already been entered
        var duplicate = false;
        for (var i = 0; i < user.donations.length; i++ ) {
          if (user.donations[i].crowdrise_donation_id === req.body.crowdrise_donation_id) {
            duplicate = true;
          }
        }
        if (!duplicate) {
          console.log('Validated donation');
          user.donations.push(req.body);
          user.premium = 1;
          user.save();
        }
      });
    }
  }
  res.send();
};

/**
 *  Show profile
 */
exports.show = function(req, res) {
  var user = req.profile;

  res.render('users/show', {
    title: user.name,
    user: user
  });
};

/**
 * Send User
 */
exports.me = function(req, res) {
  res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
  User
    .findOne({
      _id: id
    })
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new Error('Failed to load User ' + id));
      req.profile = user;
      next();
    });
};

/**
 * API Login route
 */
exports.apiSignin = function(passport){
  // return middleware
  return function apiSignin(req, res) {
    // authenticate passport with local strategy
    passport.authenticate(
      'local', 
      { session: false }, 
      function (err, user, info) {
        // if there was an error or no login data was passed
        if (err || !user) {
          var errorMessage = info ? info.message : 'Invalid login credentials.';
          // return validation error response
          return res.status(422)
            .json({ 
              message: 'Failed to authenticate. ERROR:'+errorMessage
            });
        }

        // attempt to log in the user
        req.login(user, { session: false }, function (err) {
          // log in attempt failed
          if (err) res.send(err);
  
          // generate a token for the user
          var token = jwt.sign(
            { 
              id: user._id, 
              email: user.email 
            }, 
            config.jwt_secret, 
            {
              expiresIn: 
              config.jwt_expires
            }
          );
          
          // return the generated token in the response
          return res.json({ token: token });
        });
    })(req, res);
  };
};

/**
 * API sign up route
 */
exports.apiSignup = function (req, res) {
  // ensure the email, name and, password have been passed
  if (req.body.name && req.body.password && req.body.email) {
    // find user with the provided email addess
    User.findOne({ email: req.body.email })
        .exec(function (err, existingUser) {
          if (!existingUser) {
            // create new user with request body
            var user = new User(req.body);
            // set user avatar and provider
            user.avatar = avatars[user.avatar];
            user.provider = 'local';

            // save new user
            user.save(function (err) {
              // return an error response if failed to save user
              if (err) {
                return res.status(400)
                          .json({ 
                            message: "An error occured.", 
                            errors: err.errors 
                          });
              }
              
              // log user into their account
              return req.login(user, function (err) {
                // generate a token for the user
                var token = jwt.sign(
                  { id: user._id, email: user.email }, 
                  config.jwt_secret, 
                  {expiresIn: config.jwt_expires}
                );
                // return the generated token in the response
                return res.json({ token: token });
              });
            });
          }
          else{
            // return user exists error response
            return res.status(400).json({ 
              message: "That email address is already registered." 
            });
          }
    });
  }
  else{
    // return invalid submission error
    return res.status(422).json({
      message: 'Please fill in the your name, email, and password to sign up.',
    });
  }
  
};