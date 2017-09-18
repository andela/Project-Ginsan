
var should = require('should');
var app = require('../server');
var request = require('supertest');
var user = require('./data').generateData();

describe('Testing Node RESTful APIs', function () {

    it('should be able to create a new user and redirect to home', function (done) {
        return request(app).post('/users')
            .send(user)
            .expect('Location', /\/#!/, done);

    });
    it('should return an error=esxistuser', function (done) {
        return request(app).post('/users')
            .send(user)
            .expect('Location', /#!\/signup\?error=existinguser/, done);
    });

    it('should be able to logout with no problems', function (done) {
        return request(app).get('/signout')
            .expect('Location', /\//, done);
    });

    it('should be able to login with no errors', function (done) {
        return request(app).post('/users/session')
            .send({ 'email': user.email, 'password': user.password })
            .expect('Location', /\//, done);
    });


    it('should redirect to /signin incase the email is invalid', function (done) {
        return request(app).post('/users/session')
            .send({ 'email': "invalid", 'password': user.password })
            .expect('Location', /\/signin/, done);
    });

    it('should redirect to /signin incase the password is invalid', function (done) {
        return request(app).post('/users/session')
            .send({ 'email': user.email, 'password': "invalid" })
            .expect('Location', /\/signin/, done);
    });
});
