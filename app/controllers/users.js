/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    User = mongoose.model('User'),
    config = require('../../config/config'),
    jwt = require('jsonwebtoken');

var avatars = require('./avatars').all();

/**
 * Auth callback
 */
exports.authCallback = function (req, res, next) {
    res.redirect('/chooseavatars');
};

/**
 * Show login form
 */
exports.signin = function (req, res) {
    if (!req.user) {
        res.redirect('/#!/signin?error=invalid');
    } else {
        res.redirect('/#!/app');
    }
};

/**
 * Show sign up form
 */
exports.signup = function (req, res) {
    if (!req.user) {
        res.redirect('/#!/signup');
    } else {
        res.redirect('/#!/app');
    }
};

/**
 * Logout
 */
exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function (req, res) {
    res.redirect('/');
};

/**
 * Check avatar - Confirm if the user who logged in via passport
 * already has an avatar. If they don't have one, redirect them
 * to our Choose an Avatar page.
 */
exports.checkAvatar = function (req, res) {
    if (req.user && req.user._id) {
        User.findOne({
            _id: req.user._id
        })
            .exec(function (err, user) {
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
exports.create = function (req, res) {
    if (req.body.name && req.body.password && req.body.email) {
        User.findOne({
            email: req.body.email
        }).exec(function (err, existingUser) {
            if (!existingUser) {
                var user = new User(req.body);
                // Switch the user's avatar index to an actual avatar url
                user.avatar = avatars[user.avatar];
                user.provider = 'local';
                user.save(function (err) {
                    if (err) {
                        return res.render('/#!/signup?error=unknown', {
                            errors: err.errors,
                            user: user
                        });
                    }
                    req.logIn(user, function (err) {
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
exports.avatars = function (req, res) {
    // Update the current user's profile to include the avatar choice they've made
    if (req.user && req.user._id && req.body.avatar !== undefined &&
        /\d/.test(req.body.avatar) && avatars[req.body.avatar]) {
        User.findOne({
            _id: req.user._id
        })
            .exec(function (err, user) {
                user.avatar = avatars[req.body.avatar];
                user.save();
            });
    }
    return res.redirect('/#!/app');
};

exports.addDonation = function (req, res) {
    if (req.body && req.user && req.user._id) {
        // Verify that the object contains crowdrise data
        if (req.body.amount && req.body.crowdrise_donation_id && req.body.donor_name) {
            User.findOne({
                _id: req.user._id
            })
                .exec(function (err, user) {
                    // Confirm that this object hasn't already been entered
                    var duplicate = false;
                    for (var i = 0; i < user.donations.length; i++) {
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
exports.show = function (req, res) {
    var user = req.profile;

    res.render('users/show', {
        title: user.name,
        user: user
    });
};

/**
 * Send User
 */
exports.me = function (req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function (req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function (err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};

exports.api_sign_in = async function (req, res) {
    let userWithEmail = await User.findOne({email: req.body.email});
    if (!userWithEmail) {
        return res.status(401).json({message: "Invalid Username/Password combination"});

    }
    userWithEmail = userWithEmail._doc;
    bcrypt.compare(req.body.password, userWithEmail.hashed_password, function (err, response) {
        if (response) {
            const payload = {user: userWithEmail};
            const options = {expiresIn: '2d', issuer: 'https://cardsforhumanity.com'};
            const secret = config.jwt_secret_key;
            const token = jwt.sign(payload, secret, options);
            return res.json({token: token, id: userWithEmail.id, email: userWithEmail.email}).status(200);
        } else {
            return res.status(401).json({message: 'Invalid Credentials'});
        }
    });
};


exports.api_sign_up = async function (req, res) {
    let userReqBody = req.body;
    let errors = [];
    console.log(userReqBody);
    if (!userReqBody.email) {
        errors.push('Please Provide User Email');
    }
    if (!userReqBody.name) {
        errors.push('Please provide user name');
    }
    if (!userReqBody.password) {
        errors.push('Please provide user password');
    }
    if (errors.length > 0) {
        return res.status(400).json({errorMessage: 'Invalid Request', errors: errors});

    }
    const existingUser = await User.findOne({email: userReqBody.email});
    if (existingUser) {
        return res.json({errorMessage: 'A user already exist with the email provided'}).status(400);
    }
    let user = new User({
        email: userReqBody.email,
        name: userReqBody.name,
        password: userReqBody.password,
        username: userReqBody.email,
        provider: 'local',
        avatar: avatars[userReqBody.avatar]
    });
    user.encryptPassword(user.password);
    user.save();
    const payload = {user: user};
    const options = {expiresIn: '2d', issuer: 'https://cardsforhumanity.com'};
    const secret = config.jwt_secret_key;
    const token = jwt.sign(payload, secret, options);
    return res.send({message: "sign up successful", token: token}).status(200);
};