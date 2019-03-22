// set environment to test
process.env.NODE_ENV = 'test';
var app = require('../../server');
var mongoose = require('mongoose');
var User = mongoose.model('User');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should;
var expect = chai.expect;

// test details
var testEmail = 'jondoe@gmail.com';
var testPassword = 'welcome1';
var testUsername = 'jondoe';
var testName = 'Jon Doe'


chai.use(chaiHttp);
//Our parent block
describe('<Login>', function () {
  // add test user
  before(function (done) {
    User.findOne({ email: testEmail }, function (err, user) {
      // create test user if does not exist
      if (err || !user) {
        // create test user
        var user = new User({
          name: testName,
          email: testEmail,
          username: testUsername,
          password: testPassword,
          provider: 'local'
        });
        // save tes user
        return user.save(done);
      }
      done();
    });
  });

  // Test login with valid crednetials
  describe('Correct Credentials:', function () {
    it('Should generate an auth token', function (done) {
      return chai.request(app)
        .post('/api/auth/login')
        .send({email: testEmail, password: testPassword})
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.token.should.be.a('string');
          // end request
          done();
        });
    });
  });

  // Test login with valid crednetials
  describe('Incorrect Credentials:', function () {
    it('Should return an error message', function (done) {
      return chai.request(app)
        .post('/api/auth/login')
        .send({email: testEmail, password: 'password'})
        .end(function (err, res) {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.message.should.be.a('string');
          // end request
          done();
        });
    });
  });

  // delete test user
  after(function (done) { User.findOneAndRemove({ email: testEmail }, done); });
});