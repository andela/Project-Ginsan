/**
 * Module dependencies.
 */
var should = require('should'),
    server = require('../../server'),
    mongoose = require('mongoose'),
    request=require('supertest'),
    User = mongoose.model('User'),
    agent=request.agent(server);

//Globals
var newuser;

//The tests
describe('User Creation and Authentication -Raphael Wanjiku', function() {
    describe('User Creation:', function() {
        before(function(done) {
            newuser = new User({
                name: 'Andela Kenya',
                email: 'andela@andela.com',
                username: 'andela',
                password: 'andela'
            });

            done();
        });

        describe('Saving a User', function() {
            it('should be able to save user', function(done) {
                return newuser.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show all errors when any user field is blank', function(done) {
                newuser.name = '';
                return newuser.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });
        describe('Aunthenticating A User',function()
		{
		 it('Should Redirect to /api/auth/login',function(done)
		 {
		  agent
		  .post('/users/session')
		  .field('email','andela@andela.com')
		  .field('password','andela')
		  .redirects(1)
		  done();
		 });
		 //remove the inserted user
		  after(function(done){
		  newuser.remove();
		  return done();
         });
        });
    });
});