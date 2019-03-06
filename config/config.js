var _ = require('underscore');

// Load app configuration

module.exports = _.extend(
    require(__dirname + '/../config/env/all.js'),
    require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.json') || {});

module.exports.db ='mongodb://localhost:27017/cards-FH';
module.exports.jwt_secret_key='2043FF994E96BC5CAC2C00410C674A17BF27AFF0E8EA550FD2E7DEDC6F2416B6'