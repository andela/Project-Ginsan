var users = require("../../app/controllers/users");

module.exports = function routes(app, passport){
    // login endpoint
    app.post('/api/auth/login', users.apiSignin(passport));

    // sign up endpoint
    app.post('/api/auth/signup', users.apiSignup);
};