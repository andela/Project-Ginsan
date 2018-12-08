/**
 * Module dependencies.
 */
var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');


// Set surrent user info to use across.
var currentUser = {
    email: "bulljoe88@gmail.com",
    password: "password",
    name: "Bull Joe"
};

var invalidUser = {
    name: '',
    password: '',
    email: '',
};

describe('POST /api/auth/signup (Registration error)', function() {
    it('Should Respond with 422 Invalid response and error message', function(done) {
        request(app)
        .post('/api/auth/signup')
        .send(invalidUser)
        .set('Accept', 'application/json')
        .expect(422)
        .end(function(err, res) {
            if(err) throw err;
            should(res.body.data).have.properties('error');
            done();
        });
    });
});

describe('POST /api/auth/signup (Registration)', function() {
    it('Should Respond with 200, User Object and Token', function(done) {
        request(app)
        .post('/api/auth/signup')
        .set('Accept', 'application/json')
        .send(currentUser)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if(err) throw err;
            should(res.body.user).have.properties('_id');
            (res.body).should.have.propertyByPath('user', 'name').eql(currentUser.name);
            should(res.body).have.properties('token');
            done();
        });
    });
});


